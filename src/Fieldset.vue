<template>
	<div class="ela-fieldset">
		<div class="ela-fieldset-legend" v-if="legend" v-text="legend"></div>
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'ela-fieldset',
	props: {
		legend: String,
	},
};
</script>

<style>
.ela-fieldset {
	padding: 16px 16px 0 16px;
	border: #bfcbd9 1px solid;
	margin: 15px 0 22px 0;
	background: aliceblue;
	position: relative;
	border-radius: 5px;

	> .ela-fieldset-legend {
		padding: 5px 15px 5px 15px;
		background: #bfcbd9;
		color: darkslategray;
		font-weight: bold;
		font-size: 13px;
		position: absolute;
		top: -15px;
		left: -9px;
		padding: 2px 9px;
		border-radius: 3px;
	}

	.el-row:last-child > .el-col {
		margin-bottom: -6px;
	}

	.el-form-item > .el-row:last-child > .el-col {
		margin-bottom: 0;
	}

	> .el-form-item:last-child {
		margin-bottom: 16px;
	}
}
</style>
