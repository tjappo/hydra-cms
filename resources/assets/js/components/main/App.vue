<template>
    <div id="app" class="app">
        <AppHeader/>
        <div class="app-body">
            <Sidebar :navItems="nav"/>
            <main class="main">
                <breadcrumb :list="list"/>
                <div class="container-fluid">
                    <router-view></router-view>
                </div>
            </main>
        </div>
        <AppFooter/>
    </div>
</template>

<script>
	import nav from './frontend/components/_nav';
	import {Header as AppHeader, Sidebar, Footer as AppFooter, Breadcrumb} from './index.js';
	import TextFilter from '../filters/textFilters.js';

	export default {
		name: 'app',
		mixins: [TextFilter],
		components: {
			AppHeader,
			Sidebar,
			AppFooter,
			Breadcrumb
		},
		data() {
			return {
				nav: nav.items
			}
		},
		methods: {
			addDynamicRoutes() {
				this.nav.push({
					name: 'Data',
					url: '/',
					icon: 'icon-puzzle',
                    children: []
				});
                for (let route of this.allRoutes) {
                    this.addDataChild(route);
                }
			},
            addDataChild(route) {
                const dataIndex = 1;
                this.nav[dataIndex].children.push({
                    name: this.$options.filters.capitalize(route),
                    url: '/admin/' + route,
                    icon: 'fas fa-puzzle-piece'
                });
            },
            removeDataChild(route) {
			    this.nav.children.filter((item) => {
			        return item.name !== this.$options.filters.capitalize(route);
                });
            }
		},
		mounted() {
			this.addDynamicRoutes();
            VueEventListener.listen('addDataChild', (route) => this.addDataChild(route));
            VueEventListener.listen('removeDataChild', (route) => this.removeDataChild(route));
		},
		computed: {
			name() {
				return this.$route.name
			},
			list() {
				return this.$route.matched
			}
		}
	}
</script>

<style>
    /* Import Bootstrap Vue Styles */
    @import '~bootstrap-vue/dist/bootstrap-vue.css';
</style>

<style lang="scss">
    /* Import Simple Line Icons Set */
    $simple-line-font-path: '~simple-line-icons/fonts/';
    @import '~simple-line-icons/css/simple-line-icons.css';
    // Import Main styles for this application
    @import '../../../scss/style';
</style>