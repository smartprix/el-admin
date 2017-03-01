import AppLayout from './AppLayout.vue';
import ContentLayout from './ContentLayout.vue';
import DefaultInput from './DefaultInput.vue';
import MenuItems from './MenuItems.vue';
import RightModal from './RightModal.vue';
import FilterItem from './FilterItem.vue';
import Fieldset from './Fieldset.vue';

const ElAdmin = {
	install(Vue) {
		Vue.component(AppLayout.name, AppLayout);
		Vue.component(ContentLayout.name, ContentLayout);
		Vue.component(DefaultInput.name, DefaultInput);
		Vue.component(MenuItems.name, MenuItems);
		Vue.component(RightModal.name, RightModal);
		Vue.component(FilterItem.name, FilterItem);
		Vue.component(Fieldset.name, Fieldset);
	},
};

export default ElAdmin;
export {
	AppLayout,
	ContentLayout,
	DefaultInput,
	MenuItems,
	RightModal,
};
