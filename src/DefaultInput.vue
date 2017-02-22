<template>
	<el-input
		class="ela-default-input"
		:class="{'is-default': isDefault}"
		:type="type"
		:placeholder="placeholder"
		:disabled="disabled"
		:size="size"
		:icon="icon"
		:name="name"
		:form="form"
		:readonly="isDefault || readonly"
		ref="elInput"
		v-model="currentValue">
		<template slot="append">
			<el-checkbox
				:disabled="disabled || readonly"
				v-model="isDefault"
			>
			<span>Default</span>
			</el-checkbox>
		</template>
	</el-input>
</template>

<script>
export default {
	name: 'ela-default-input',
	vModel: true,
	props: {
		type: String,
		placeholder: String,
		disabled: Boolean,
		size: String,
		icon: String,
		name: String,
		form: String,
		readonly: Boolean,
		default: {},
	},
	data() {
		return {
			isDefault: false,
		};
	},
	created() {
		this.checkDefault();
	},
	methods: {
		checkDefault() {
			if (this.default === undefined) {
				this.isDefault = false;
			}
			else if (this.currentValue === undefined ||
				this.currentValue === null ||
				this.currentValue === '') {
				this.isDefault = true;
			}
			else if (this.currentValue === this.default) {
				this.isDefault = true;
			}
			else {
				this.isDefault = false;
			}

			if (this.isDefault) {
				this.currentValue = this.default;
			}
		},
	},
	watch: {
		default(val) {
			if (this.isDefault) {
				this.currentValue = val;
			}
		},
		isDefault(val) {
			if (val) {
				this.currentValue = this.default;
			}
			else {
				// this.$refs.elInput.$refs.input.focus();
			}
		},
	},
};
</script>

<style>
.el-input.is-default .el-input__inner {
	background-color: #EFF2F7;
	border-color: #D3DCE6;
	cursor: not-allowed;
}
.ela-default-input.in-whole-cell {
	display: block;

	&.is-default .el-input__inner {
		background-color: #effbfb;
	}

	.el-input-group__append {
		position: absolute;
		top: 0;
		right: 14px;
		bottom: 0;
		display: flex;
		background: transparent;
		border: 0;
		border-radius: 0;
		align-items: center;

		.el-checkbox__label {
			display: none;
		}
	}
}
</style>
