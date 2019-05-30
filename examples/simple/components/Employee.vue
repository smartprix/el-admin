<template>
	<ela-content-layout>
		<el-tabs slot="tabs" type="card">
			<el-tab-pane label="Details">
				<employee-form :data="data" @done="$emit('done')"></employee-form>
			</el-tab-pane>
			<el-tab-pane label="Payroll">
				<payroll-form :data="data || {}"></payroll-form>
			</el-tab-pane>
			<el-tab-pane v-if="!isAdd" label="Salaries">
			</el-tab-pane>
		</el-tabs>
		<div slot="head">
			<h3>
				<span v-if="isAdd">Add&nbsp;</span>Employee
				<small>
					<modal-link :data="{data}" to="employee">{{ data && data.email }}</modal-link>
				</small>
			</h3>
			<div class="header-right">
				<el-button
					v-if="!isAdd"
					type="danger"
					icon="delete"
					@click="deleteEmployee(data)"></el-button>
			</div>
		</div>
	</ela-content-layout>
</template>

<script>
import EmployeeForm from './EmployeeForm.vue';
import PayrollForm from './PayrollForm.vue';

export default {
	name: 'Employee',
	reEvents: {delete: 'done'},
	components: {
		EmployeeForm,
		PayrollForm,
	},
	props: {
		data: Object,
	},
	data() {
		return {
			/* beforeClose is executed when modal overlay is clicked
			beforeClose could be a function returning true (close modal) or false (don't close modal)
			or it can be 'warning' which will show confirm dialog before closing */
			beforeClose: 'warning',
		};
	},
	computed: {
		isAdd() {
			return !(this.data && this.data.id);
		},
	},
	methods: {
		deleteEmployee(employee) {
			this.$confirm(
				'Are you sure?',
				'Delete Employee',
				{type: 'warning'},
			).then(() => {
				console.log('Deleting Employee', employee);
				this.$notify({
					title: 'Success',
					message: 'Employee Deleted Successfully',
					type: 'success',
				});
				this.$emit('done');
			});
		},
	},
};
</script>

<style>
</style>
