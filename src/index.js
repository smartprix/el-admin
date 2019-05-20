/* eslint-disable */
/* This file needs to be in ES5 format because we're not compiling it using babel */

import AppLayout from './AppLayout.vue';
import ContentLayout from './ContentLayout.vue';
import DefaultInput from './DefaultInput.vue';
import MenuItems from './MenuItems.vue';
import RightModal from './RightModal.vue';
import FilterItem from './FilterItem.vue';
import Fieldset from './Fieldset.vue';
import SchemaForm from './SchemaForm.vue';
import ModalLink from './ModalLink.vue';
import Markdown from './Markdown.vue';

var ElAdmin = {
	install: function(Vue) {
		Vue.component(AppLayout.name, AppLayout);
		Vue.component(ContentLayout.name, ContentLayout);
		Vue.component(DefaultInput.name, DefaultInput);
		Vue.component(MenuItems.name, MenuItems);
		Vue.component(RightModal.name, RightModal);
		Vue.component(FilterItem.name, FilterItem);
		Vue.component(Fieldset.name, Fieldset);
		Vue.component(SchemaForm.name, SchemaForm);
		Vue.component(ModalLink.name, ModalLink);
		Vue.component(Markdown.name, Markdown);
	}
};

export default ElAdmin;
export {
	AppLayout,
	ContentLayout,
	DefaultInput,
	MenuItems,
	RightModal,
};
