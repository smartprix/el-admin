<template>
	<div v-show="currentValue" class="ela-right-modal-wrapper">
		<div
			ref="rightModal"
			:style="{
				maxWidth: `${1040 * (1 - (index * 0.016))}px`,
				minWidth: `${minWidth * (1 - (index * 0.016))}px`,
				width: `${90 * (1 - (index * 0.016))}%`,
				zIndex: `${(index + 1) * 99}`,
			}"
			class="ela-right-modal"
		>
			<div class="right-modal-drag" @mousedown="dragStart"></div>
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

	data() {
		const windowWidth = (typeof window === 'undefined' ? 1000 : window.innerWidth) || 1000;
		const screenWidth = (typeof window === 'undefined' ? 1000 : window.screen.availWidth) || 1000;
		return {
			dragging: false,
			startWidth: null,
			pageX: 0,
			minWidth: Math.min(900, screenWidth < 900 ? (windowWidth - 90) : (windowWidth - 250)),
		};
	},

	created() {
		document.addEventListener('mousemove', this.drag);
		document.addEventListener('mouseup', this.dragStop);
	},

	beforeDestroy() {
		document.removeEventListener('mousemove', this.drag);
		document.removeEventListener('mouseup', this.dragStop);
	},

	methods: {
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

		dragStart(e) {
			this.dragging = true;
			this.startWidth = parseInt(this.$refs.rightModal.style.maxWidth, 10);
			this.pageX = e.pageX;
			this.$refs.rightModal.style.userSelect = 'none';
		},

		drag(e) {
			if (!this.dragging) return;

			const dx = e.pageX - this.pageX;
			if (this.startWidth - dx < parseInt(this.$refs.rightModal.style.minWidth, 10)) return;

			this.$refs.rightModal.style.maxWidth = (this.startWidth - dx) + 'px';
		},

		dragStop() {
			this.dragging = false;
			this.$refs.rightModal.style.userSelect = 'auto';
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

.right-modal-drag {
	height: 100%;
	width: 8px;
	position: absolute;
	background: transparent;
	z-index: 100;
	left: -4px;
	cursor: col-resize;
}
</style>
