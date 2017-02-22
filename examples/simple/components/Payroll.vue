<template>
	<ela-content-layout padding="0">
		<div slot="head">
			<h3>Payroll</h3>
			<el-select placeholder="Select Month" value="dec2016" @change="monthChanged">
				<el-option value="dec2016" label="December 2016"></el-option>
				<el-option value="nov2016" label="November 2016"></el-option>
			</el-select>
			<div class="header-right">
				<el-button type="primary" @click="save">Save</el-button>
				<el-button type="success" @click="lock">Lock</el-button>
			</div>
		</div>
		<div slot="filters">

		</div>
		<el-table :data="employees" row-key="id" stripe border>
			<el-table-column prop="id" label="ID" width="60px"></el-table-column>
			<el-table-column prop="name" label="Name" width="200px">
				<template scope="scope">
					<a class="modal-ref" @click="$view.employee(scope.row)">{{ scope.row.name }}</a>
				</template>
			</el-table-column>
			<el-table-column prop="payroll.lastCTCDate" label="Last CTC Date" width="120px"></el-table-column>
			<el-table-column prop="leaves.plQuota" label="PL Quota"></el-table-column>
			<el-table-column label="UPL">
				<template scope="scope">
					{{ calcUnpaidLeaves(scope.row) }}
				</template>
			</el-table-column>
			<el-table-column prop="pan" label="PL">
				<template scope="scope">
					<ela-default-input
						class="in-whole-cell"
						:default="calcPl(scope.row)"
						name="pl"
						v-model="scope.row.payrollMonthly.pl">
					</ela-default-input>
				</template>
			</el-table-column>
			<el-table-column prop="pan" label="Total Leaves">
				<template scope="scope">
					<el-input class="in-whole-cell" v-model="scope.row.payrollMonthly.totalLeaves"></el-input>
				</template>
			</el-table-column>
			<el-table-column prop="pan" label="Performance Rating">
				<template scope="scope">
					<el-input :value="3" class="in-whole-cell" v-model="scope.row.payrollMonthly.performaceRating"></el-input>
				</template>
			</el-table-column>
			<el-table-column prop="pan" label="Bonus Deduction">
				<template scope="scope">
					<el-input class="in-whole-cell" v-model="scope.row.payrollMonthly.bonusDeduction"></el-input>
				</template>
			</el-table-column>
			<el-table-column prop="pan" label="Adjustments">
				<template scope="scope">
					<el-input class="in-whole-cell" v-model="scope.row.payrollMonthly.adjustments"></el-input>
				</template>
			</el-table-column>
			<el-table-column label="Leave Deduction">
				<template scope="scope">
					{{ calcLeaveDeduction(scope.row) | round }}
				</template>
			</el-table-column>
			<el-table-column prop="payroll.tds" label="TDS"></el-table-column>
			<el-table-column prop="payroll.netSalary" label="Net Salary"></el-table-column>
			<el-table-column prop="pan" label="Retention Bonus"></el-table-column>
			<el-table-column label="To Be Paid">
				<template scope="scope">
					{{ calcToBePaid(scope.row) | round }}
				</template>
			</el-table-column>
			<el-table-column prop="pan" label="Paid">
				<template scope="scope">
					<ela-default-input
						:default="calcToBePaid(scope.row) | round"
						class="in-whole-cell"
						name="paid"
						v-model="scope.row.payrollMonthly.paid">
					</ela-default-input>
				</template>
			</el-table-column>
			<el-table-column prop="pan" label="Comment"></el-table-column>
		</el-table>
		<div slot="foot">
			<div class="footer-right">
				<el-pagination
					:page-sizes="[100, 200, 300, 400]"
					:page-size="100"
					layout="total, prev, pager, next"
					:total="1000">
				</el-pagination>
			</div>
		</div>
	</ela-content-layout>
</template>

<script>
import payrollData from './payrollData';

export default {
	name: 'payroll',
	props: {},
	data() {
		return {
			payrollMonthly: {},
			employees: [],
			leaves: {
				plQuota: 10,
			},
			workingDays: 22,
		};
	},
	created() {
		payrollData.forEach((employee) => {
			employee.payrollMonthly = employee.payrollMonthly || {};
		});
		this.employees = payrollData;
	},
	computed: {
	},
	methods: {
		calcPl(row) {
			return Math.min(Math.min(5, row.leaves.plQuota), (row.payrollMonthly.totalLeaves || 0));
		},
		calcUnpaidLeaves(row) {
			return row.payrollMonthly.totalLeaves - row.payrollMonthly.pl;
		},
		calcLeaveDeduction(row) {
			return (row.payroll.netSalary / (this.workingDays || 22)) * this.calcUnpaidLeaves(row);
		},
		calcToBePaid(row) {
			return row.payroll.netSalary -
				row.payroll.tds -
				this.calcLeaveDeduction(row) -
				row.payrollMonthly.bonusDeduction -
				row.payrollMonthly.adjustments;
		},
		save() {

		},
		lock() {

		},
		unlock() {

		},
		monthChanged() {

		},
	},
};
</script>

<style>
.el-table .cell {
	word-break: normal;
}
.el-input.in-whole-cell {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;

	.el-input__inner {
		border: 0;
		border-radius: 0;
		background: lightcyan;
		height: 100%;
	}
}
</style>
