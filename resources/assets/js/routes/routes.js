import VueRouter from 'vue-router';

import AdminIndex from "../components/admin/Index.vue";
import AdminCreate from "../components/admin/Create.vue";
import AdminEdit from "../components/admin/Edit.vue";

// Views
import Dashboard from '../components/index/Dashboard.vue';

/**
 * Vue routes
 * @type {[*]} object containing all routes
 */
const routes = [
	{
		path: '/',
		name: 'Index',
		component: Dashboard
	},
	{
		path: '/admin/:name',
		name: 'AdminIndex',
		component: AdminIndex,
		props: true,
	},
	{
		path: '/admin/:name/create',
		name: 'AdminCreate',
		component: AdminCreate,
		props: true,
	},
	{
		path: '/admin/:name/edit/:id',
		name: 'AdminEdit',
		component: AdminEdit,
		props: true,
	},
	{
		path: '*',
		name: 'Redirect',
		redirect: '/'
	},
];

const router = new VueRouter({
	// mode: 'history',
	// base: window.location.hostname != 'localhost' ? '/' + window.location.pathname + '/' : '/',
	routes: routes,
	scrollBehavior: () => ({ y: 0 }),
});

// router.afterEach(function(to, from){
// 	var hashTag = window.location.hash.replace(/^\/|\/$/g, '');
// 	if (hashTag != '') router.push({ path: hashTag.substring(1) });
//
// 	$("body").get(0).scrollIntoView({behavior: 'smooth'});
// });

export default router;