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
	import nav from './components/_nav';
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
				let children = [];
				for (let route of this.allRoutes) {
					children.push({
						name: this.$options.filters.capitalize(route),
						url: '/admin/' + route,
						icon: 'fas fa-puzzle-piece'
					});
				}
				this.nav.push({
					name: 'Data',
					url: '/',
					icon: 'icon-puzzle',
					children: children
				});
			}
		},
		mounted() {
			this.addDynamicRoutes();
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