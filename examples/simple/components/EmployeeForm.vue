<template>
	<el-form label-position="top">
		<el-form-item label="Employee ID">
			<el-input v-model="employee.id"></el-input>
		</el-form-item>
		<el-row :gutter="12">
			<el-col :span="12">
				<el-form-item label="Name">
					<el-input v-model="employee.name"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="6">
				<el-form-item label="Gender">
					<el-select v-model="gender">
						<el-option label="Male" value="male"></el-option>
						<el-option label="Female" value="female"></el-option>
					</el-select>
				</el-form-item>
			</el-col>
			<el-col :span="6">
				<el-form-item label="Date of Birth">
					<el-date-picker type="date" v-model="doj" style="width:100%;" readonly></el-date-picker>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row :gutter="12">
			<el-col :span="12">
				<el-form-item label="Company Email">
					<el-input type="email" v-model="employee.email"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="Personal Email">
					<el-input type="email" v-model="employee.personal_email"></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row :gutter="12">
			<el-col :span="12">
				<el-form-item label="Personal Phone">
					<el-input type="phone"></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="Emergency Phone">
					<el-input type="phone"></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-form-item label="Date Of Joining">
			<el-date-picker type="date" v-model="doj"></el-date-picker>
		</el-form-item>
		<el-row :gutter="12">
			<el-col :span="18">
				<el-form-item label="Designation">
					<el-input></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="6">
				<el-form-item label="Points">
					<el-input></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-row :gutter="12">
			<el-col :span="12">
				<el-form-item label="Bank Account Number">
					<el-input></el-input>
				</el-form-item>
			</el-col>
			<el-col :span="12">
				<el-form-item label="PAN Number">
					<el-input></el-input>
				</el-form-item>
			</el-col>
		</el-row>
		<el-form-item>
			<el-button type="primary" @click="saveEmployee(employee)">Save</el-button>
			<el-button type="text" @click="onCancel">Cancel</el-button>
		</el-form-item>
	</el-form>
</template>

<script>
export default {
	name: 'employee-form',
	reEvents: {save: 'done'},
	vModel: 'currentValue',
	props: {
		data: {
			type: Object,
			default: () => ({}),
			modify: 'employee',
		},
	},
	data() {
		return {
			doj: '2017-01-04',
			gender: 'male',
		};
	},
	methods: {
		saveEmployee(employee) {
			console.log('Saving Employee', employee);
			this.$notify({
				title: 'Success',
				message: 'Employee Saved Successfully',
				type: 'success',
			});
		},

		onCancel() {
			this.$emit('done');
		},
	},
};
</script>
