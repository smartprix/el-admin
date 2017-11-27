import 'element-ui/lib/theme-chalk/index.css';
import Vue from 'vue';
import Element from 'element-ui/lib/index';
import locale from 'element-ui/lib/locale/lang/en';
import VueUtils from 'vutils';

// this is for this example only because the source lies in it's parent folder
// in reality you would do something like
// import ElAdmin from 'el-admin';
import ElAdmin from '../../src/index';

import App from './App.vue';
import router from './router';

import modalViews from './modalViews';

Vue.use(VueUtils);
Vue.use(Element, {locale});
Vue.use(ElAdmin);

Vue.prototype.$view = modalViews;

/* eslint-disable no-new */
new Vue({
	router,
	el: '#app',
	render: h => h(App),
});
