<template>
	<el-col
		:span="span"
		:class="{'ela-filter-item-right': float === 'right'}"
		class="ela-filter-item"
	>
		<div class="el-form-item el-form--label-top">
			<label v-if="label" class="el-form-item__label">{{ label }}&nbsp;</label>
			<div class="el-form-item__content">
				<slot></slot>
			</div>
		</div>
	</el-col>
</template>

<script>
export default {
	name: 'ElaFilterItem',
	props: {
		label: String,
		span: {
			type: Number,
			default: 6,
		},
		float: {
			type: String,
			default: 'left',
		},
	},
};
</script>

<style lang="postcss">
.ela-filter-item {
	&.el-col {
		padding-left: 5px;
		padding-right: 5px;
	}

	.el-form-item {
		margin-bottom: 18px;
	}

	.el-form--label-top .el-form-item__label {
		padding: 0 0 7px;
		font-size: 13px;
	}

	.el-form-item__content {
		line-height: 0;
	}

	.el-radio-button--small .el-radio-button__inner {
		padding: 8px 10px;
		font-size: 12px;
		line-height: 12px;
	}

	.el-select {
		display: block;
	}
}

.ela-filter-item-right {
	margin-left: auto;
	float: right;

	.el-form-item {
		text-align: right;
	}
}
</style>
