import Vue from 'vue';
import Router from 'vue-router';
import Employees from './components/Employees.vue';
import Payroll from './components/Payroll.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',
	scrollBehavior: () => ({y: 0}),
	routes: [
		{path: '/employees', component: Employees, name: 'Employees'},
		{path: '/payroll', component: Payroll, name: 'Payroll'},
	],
});
