<script lang="jsx">
function isObjectEmpty(obj) {
	const keys = Object.keys(obj);
	for (const key of keys) {
		if (obj[key]) return false;
	}
	return true;
}

export default {
	name: 'ElaSchemaForm',
	vModel: 'form',
	props: {
		schema: Object,
		value: {
			default: () => [{}],
		},
	},

	computed: {
		hasEmpty() {
			return this.form.findIndex(item => isObjectEmpty(item)) > -1;
		},
	},

	created() {
		if (!this.schema) throw new Error('Schema missing');
		if (!this.schema.type === 'array') throw new Error('Only array type supported');
		if (!this.schema.items) throw new Error('Schema items missing');
	},

	methods: {
		addItem() {
			this.form.push({});
		},

		deleteItem(index) {
			this.form.splice(index, 1);
		},

		setValue(obj, key, value) {
			this.$set(obj, key, value);
		},
	},

	// eslint-disable-next-line
	render(h) {
		const properties = this.schema.items.properties;
		const propKeys = Object.keys(properties);
		const span = Math.floor(22 / propKeys.length);

		const header = (
			<el-row gutter={12}>
				{propKeys.map(key => (
					<el-col span={span}>
						<div style="margin-bottom: 14px; font-weight: bold;">{properties[key].title || key}</div>
					</el-col>
				))}
			</el-row>
		);

		const singleRow = (data, index) => (
			<el-row gutter={12}>
				{propKeys.map(key => (
					<el-col span={span}>
						<el-form-item style="margin-bottom: 12px;">
							<el-input
								value={data[key]}
								onInput={e => this.setValue(data, key, e)}>
							</el-input>
						</el-form-item>
					</el-col>
				))}
				<el-col span={2}>
					<el-button
						icon="close"
						type="danger"
						onClick={() => this.deleteItem(index)}
						disabled={this.form.length < 2}>
					</el-button>
				</el-col>
			</el-row>
		);

		const rows = this.form.map((item, index) => singleRow(item, index));

		return (
			<div>
				{header}
				{rows}
				<el-form-item style="margin-bottom: 16px;">
					<el-button
						onClick={this.addItem}
						disabled={this.hasEmpty}
						icon="plus"
						type="primary">Add Item
					</el-button>
				</el-form-item>
			</div>
		);
	},
};
</script>
