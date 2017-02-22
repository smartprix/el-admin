import Vue from 'vue';
import Employee from './components/Employee.vue';

function openRightModal(component, props) {
	Vue.bus.$emit('openRightModal', {component, props});
}

export default {
	employee(employee) {
		openRightModal(Employee, {data: employee});
	},
};
