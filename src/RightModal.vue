<template>
	<div class="ela-right-modal-wrapper" v-show="currentValue">
		<div class="ela-right-modal" :style="{
			maxWidth: `${800 * (1 - (index * 0.016))}px`,
			width: `${90 * (1 - (index * 0.016))}%`,
			zIndex: `${(index + 1) * 99}`,
		}">
			<slot></slot>
		</div>
		<div class="ela-right-modal-overlay"
			@click.stop="currentValue = false"
			:style="{zIndex: `${(index + 1) * 98}`}">
		</div>
	</div>
</template>

<script>
export default {
	name: 'ela-right-modal',
	vModel: true,
	props: {
		hideOnClick: Boolean,
		value: Boolean,
		index: {
			type: Number,
			default: 0,
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
