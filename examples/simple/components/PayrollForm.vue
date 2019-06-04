<template>
	<el-form label-position="top">
		<el-form-item label="Effective From">
			<el-col :span="11">
				<el-select value="jan2016" style="width:100%" v-model="payroll.effectiveFrom">
					<el-option label="January 2016" value="jan2016"></el-option>
				</el-select>
			</el-col>
		</el-form-item>
		<el-form-item label="Description" prop="description">
			<markdown-editor
				v-model="test"
				:file-upload-handler="uploadFile">
			</markdown-editor>
		</el-form-item>
		<el-form-item>
			<el-button type="primary" @click="savePayroll(payroll)" native-type="submit">Save</el-button>
			<el-button type="text" @click="onCancel">Cancel</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
import MarkdownEditor from '../../../src/Markdown.vue';

export default {
	name: 'employee-form',
	components: {
		MarkdownEditor,
	},
	reEvents: {save: 'done'},
	vModel: 'currentValue',
	props: {
		data: {
			type: Object,
			default: () => ({}),
			modify: 'payroll',
		},
	},
	data() {
		return {
			test: '',
			doj: '2017-01-04',
			gender: 'male',
		};
	},
	methods: {
		savePayroll(employee) {
			console.log('Saving Payroll', employee);
			this.$notify({
				title: 'Success',
				message: 'Payroll Saved Successfully',
				type: 'success',
			});
		},

		onCancel() {
			this.$emit('done');
		},

		uploadFile(res) {
			console.log(res);
		},
	},
};
</script>
