<template>
	<div class="ela-right-modal-wrapper" v-show="currentValue">
		<div class="ela-right-modal">
			<slot></slot>
		</div>
		<div class="ela-right-modal-overlay" @click="currentValue = false"></div>
	</div>
</template>

<script>
export default {
	name: 'ela-right-modal',
	vModel: true,
	props: {
		hideOnClick: true,
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
	max-width: 800px;
	position: absolute;
	right: 0;
	top: 0;
	width: 90%;
	z-index: 99;
}

.ela-right-modal-overlay {
	background-color: rgba(60,57,63,.3);
	bottom: 0;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;
	z-index: 98;
}
</style>
