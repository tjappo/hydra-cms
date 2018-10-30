import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminIndex from '@/components/data/Index.vue'
import AdminCreate from '@/components/data/Create.vue'
import AdminEdit from '@/components/data/Edit.vue'

import SchemaCreate from '@/components/schema/Create.vue'
import SchemaEdit from '@/components/schema/Edit.vue'

import Sync from '@/components/sync/Sync.vue'

import Dashboard from '@/components/index/Dashboard.vue'

import VisualComposer from '@/components/visualComposer/Index'

window.Vue = Vue
Vue.use(VueRouter)

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
    props: true
  },
  {
    path: '/admin/:name/create',
    name: 'AdminCreate',
    component: AdminCreate,
    props: true
  },
  {
    path: '/admin/:name/edit/:id',
    name: 'AdminEdit',
    component: AdminEdit,
    props: true
  },
  {
    path: '/schema/create',
    name: 'SchemaCreate',
    component: SchemaCreate
  },
  {
    path: '/schema/:name/edit',
    name: 'SchemaEdit',
    component: SchemaEdit,
    props: true
  },
  {
    path: '/sync',
    name: 'Sync',
    component: Sync,
    props: true
  },
  {
    path: '/VisualComposer',
    name: 'VisualComposer',
    component: VisualComposer
  },
  {
    path: '*',
    name: 'Redirect',
    redirect: '/'
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: window.location.hostname != 'localhost' ? '/' + window.location.pathname + '/' : '/',
  routes: routes,
  scrollBehavior: () => ({y: 0})
})

export default router
