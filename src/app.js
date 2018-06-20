import vueHeadful from 'vue-headful';
import BootstrapVue from 'bootstrap-vue'

import router from './router';
import App from './App.vue';

import EventNotificationListener from './components/main/frontend/vue-event-notification-mixin';
import MetaHandler from './components/filters/metaHandler';
import DataHandler from './components/filters/dataHandler';

import {store} from './store/store';

window.axios = require('axios');
window.axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest'
};

Vue.config.productionTip = false;
Vue.component('vue-headful', vueHeadful);
Vue.mixin(MetaHandler);
Vue.mixin(DataHandler);
Vue.use(BootstrapVue);

/**
 * Initialize Vue instances
 */
/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    mixins: [EventNotificationListener],
    components: {
        App
    },
    template: '<App/>',
    router,
    linkActiveClass: 'open active',
});
