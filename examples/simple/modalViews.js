import Vue from 'vue';
import Employee from './components/Employee.vue';

function openRightModal(component, props) {
	Vue.bus.$emit('openRightModal', {component, props});
}

export const componentMap = {
	employee: Employee,
};

export default {
	employee(employee) {
		openRightModal(Employee, {data: employee});
	},
};
