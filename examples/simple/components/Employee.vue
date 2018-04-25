<template>
	<ela-content-layout>
		<el-tabs type="card" slot="tabs">
			<el-tab-pane label="Details">
				<employee-form :data="data" @done="$emit('done')"></employee-form>
			</el-tab-pane>
			<el-tab-pane label="Payroll">
				<payroll-form :data="data || {}"></payroll-form>
			</el-tab-pane>
			<el-tab-pane label="Salaries" v-if="!isAdd">
			</el-tab-pane>
		</el-tabs>
		<div slot="head">
			<h3>
				<span v-if="isAdd">Add&nbsp;</span>Employee
				<small>
					<modal-link to="employee" :data="{data}">{{data && data.email}}</modal-link>
				</small>
			</h3>
			<div class="header-right">
				<el-button type="danger" icon="delete" @click="deleteEmployee(data)" v-if="!isAdd"></el-button>
			</div>
		</div>
	</ela-content-layout>
</template>

<script>
import EmployeeForm from './EmployeeForm.vue';
import PayrollForm from './PayrollForm.vue';

export default {
	name: 'employee',
	reEvents: {delete: 'done'},
	components: {
		EmployeeForm,
		PayrollForm,
	},
	props: {
		data: Object,
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
				console.log("Deleting Employee", employee);
				this.$notify({
					title: 'Success',
					message: 'Employee Deleted Successfully',
					type: 'success',
				});
				this.$emit('done');
			});
		}
	},
};
</script>

<style>
</style>
