require('./components/main/frontend/event-notification');

import vueHeadful from 'vue-headful';
import BootstrapVue from 'bootstrap-vue'

import router from './routes/routes.js';
import App from './components/main/App.vue';

import EventNotificationListener from './components/main/frontend/vue-event-notification-mixin';
import MetaHandler from './components/filters/metaHandler';
import DataHandler from './components/filters/dataHandler';

window.axios = require('axios');
window.axios.defaults.headers.common = {
	'X-Requested-With': 'XMLHttpRequest'
};

Vue.component('vue-headful', vueHeadful);
Vue.mixin(MetaHandler);
Vue.mixin(DataHandler);
Vue.use(BootstrapVue);

/**
 * Initialize Vue instances
 */
new Vue({
	el: '#app',
	mixins: [EventNotificationListener],
	components: {
		App
	},
	template: '<App/>',
	router,
	linkActiveClass: 'open active',
});