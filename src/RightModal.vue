<template>
	<div v-show="currentValue" class="ela-right-modal-wrapper">
		<div
			:style="{
				maxWidth: `${800 * (1 - (index * 0.016))}px`,
				width: `${90 * (1 - (index * 0.016))}%`,
				zIndex: `${(index + 1) * 99}`,
			}"
			class="ela-right-modal">
			<slot></slot>
		</div>
		<div
			:style="{zIndex: `${(index + 1) * 98}`}"
			class="ela-right-modal-overlay"
			@click.stop="beforeClose()">
		</div>
	</div>
</template>

<script>
import get from 'lodash/get';

export default {
	name: 'ElaRightModal',
	vModel: true,
	props: {
		hideOnClick: Boolean,
		value: Boolean,
		index: {
			type: Number,
			default: 0,
		},
	},

	mounted() {
		document.querySelector('.ela-right-modal-wrapper').addEventListener('keyup', this.handleKeyUpEvent);
		document.querySelector('.ela-right-modal-wrapper').addEventListener('keydown', this.handleKeyDownEvent);
	},

	methods: {

		handleKeyUpEvent(e) {
			// press CTRL + Enter to trigger click to submit button (native-type="submit" has to be added in el-button)
			if (e.keyCode === 13 && (e.ctrlKey)) {
				const activePaneId = this.$el.querySelector('.el-tabs__item.is-active').getAttribute('aria-controls');
				document.querySelector(`#${activePaneId} button[type=submit]`).click();
			}

			if (e.keyCode === 27) { // press ESC to close switcher menu
				this.beforeClose();
			}
		},

		handleKeyDownEvent(e) {
			if (e.ctrlKey && e.keyCode === 13) {
				e.preventDefault();
			}
		},

		async beforeClose() {
			const handler = get(this, '$children.0.beforeClose');

			if (handler === 'warning') {
				const confirm = await this.$confirm(
					'Are you sure you want to close?',
					'Close',
					{
						type: 'warning',
						cancelButtonText: 'Cancel',
						confirmButtonText: 'Close',
					},
				).catch(() => {});
				if (confirm) this.currentValue = false;
				return;
			}

			if (typeof handler === 'function') {
				const toClose = await handler();
				if (toClose !== false) this.currentValue = false;
				return;
			}

			this.currentValue = false;
		},
	},
};
</script>

<style>
.ela-right-modal-wrapper {
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
}

.ela-right-modal {
	background: #fff;
	box-shadow: 0 0 40px 0 rgba(49,47,51,.4), 1px 0 0 0 #E2E0DD;
	display: flex;
	flex-direction: column;
	height: 100%;
	position: absolute;
	right: 0;
	top: 0;
}

.ela-right-modal-overlay {
	background-color: rgba(60,57,63,.3);
	bottom: 0;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
}
</style>
