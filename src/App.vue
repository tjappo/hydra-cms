<template>
  <div
    id="app"
    class="app">
    <AppHeader/>
    <div class="app-body">
      <Sidebar :nav-items="nav"/>
      <main class="main">
        <breadcrumb :list="list"/>
        <div class="container-fluid">
          <router-view/>
        </div>
      </main>
      <AppAside/>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
  import nav from '@/components/main/frontend/components/_nav'
  import {
    Aside as AppAside,
    Breadcrumb,
    Footer as AppFooter,
    Header as AppHeader,
    Sidebar
  } from '@/components/main/index.js'
  import TextFilter from '@/components/filters/textFilters.js'
  import pullData from '@/components/sync/functions/pullData'

  export default {
    name: 'App',
    mixins: [TextFilter, pullData],
    components: {
      AppHeader,
      Sidebar,
      AppAside,
      AppFooter,
      Breadcrumb
    },
    data () {
      return {
        nav: nav.items.slice(0),
        dataIndex: 1
      }
    },
    methods: {
      initialiseDataRoute () {
        this.nav.push({
          name: 'Data',
          url: '/',
          icon: '',
          faIcon: 'sitemap',
          children: []
        })
      },
      addDataChild (route) {
        if (route === 'meta') {
          this.nav.push({
            name: this.$options.filters.capitalize(route),
            url: '/admin/' + route,
            icon: '',
            faIcon: 'chart-line'
          })
        } else {
          this.nav[this.dataIndex].children.push({
            name: this.$options.filters.capitalize(route),
            url: '/admin/' + route,
            icon: '',
            faIcon: 'puzzle-piece'
          })
        }
      },
      removeDataChild (route) {
        this.nav[this.dataIndex].children.filter((item) => {
          return item.name !== this.$options.filters.capitalize(route)
        })
      },
      resetNav (routes) {
        this.nav = nav.items.slice(0)
        this.initialiseDataRoute()
        routes.forEach((route) => this.addDataChild(route))
      }
    },
    beforeMount () {
      this.pullFolder()
    },
    mounted () {
      this.initialiseDataRoute()
      VueEventListener.listen('addDataChild', (route) => this.addDataChild(route))
      VueEventListener.listen('removeDataChild', (route) => this.removeDataChild(route))
    },
    computed: {
      name () {
        return this.$route.name
      },
      list () {
        return this.$route.matched
      },
      dataRoutes () {
        return this.$store.getters.dataRoutes
      }
    },
    watch: {
      dataRoutes (newDataRoutes) {
        this.resetNav(newDataRoutes)
      }
    }
  }
</script>

<style>
  @import './styles/css/vendors/bootstrap-vue.css';
</style>

<style lang="scss">
  // Import Main styles for this application
  @import './styles/scss/style';
</style>
