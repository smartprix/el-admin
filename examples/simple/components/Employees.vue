<template>
	<ela-content-layout padding="0">
		<div slot="head">
			<h3>Employees</h3>
			<div class="header-right">
				<el-button type="primary" icon="plus" @click="$view.employee()">Add Employee</el-button>
			</div>
		</div>
		<el-table :data="employees" stripe border>
			<el-table-column label="View" align="center" width="100">
				<el-button
					slot-scope="scope"
					size="small"
					type="primary"
					@click="$view.employee(scope.row)">Details
				</el-button>
			</el-table-column>
			<el-table-column prop="id" label="ID" width="60px"></el-table-column>
			<el-table-column prop="name" label="Name"></el-table-column>
			<el-table-column label="Email">
				<el-table-column prop="email" label="Company"></el-table-column>
				<el-table-column prop="personal_email" label="Personal"></el-table-column>
			</el-table-column>
		</el-table>
	</ela-content-layout>
</template>

<script>
import Employee from './Employee.vue';

export default {
	name: 'employees',
	props: {},
	data() {
		return {
			employees: [
				{
					id: '1',
					name: 'Hitesh Khandelwal',
					email: 'hitesh@example.com',
					personal_email: 'khandelwal@example.com',
				},
				{
					id: '2',
					name: 'Dipanshu Agarwal',
					email: 'dipanshu@example.com',
					personal_email: 'agarwal@example.com',
				},
				{
					id: '3',
					name: 'Abhinav Chaudhary',
					email: 'abhinav@example.com',
					personal_email: 'chaudhary@example.com',
				},
				{
					id: '4',
					name: 'Kritarth Anand',
					email: 'kritarth@example.com',
					personal_email: 'anand@example.com',
				},
			],
		};
	},
};
</script>

<style>
</style>
