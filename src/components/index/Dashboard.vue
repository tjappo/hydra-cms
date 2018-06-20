<template>
  <div class="animated fadeIn index-wrapper">
    <vue-headful
      :title="metaTitle ||'Shift - Decentralize the web'"
      :description="metaDescription || 'Page meta description'"
    />
    <div class="row justfiy-content-center">
      <div class="card w-100">
        <div class="card-header">
          Main page
          <b-link
            class="btn btn-success float-right"
            :to="{name: 'SchemaCreate'}">Create Schema</b-link>
        </div>
        <div class="card-body">
          <div class="row">
            <div
              class="col-sm-6"
              v-for="(route, key) in allRoutes"
              :key="key"
            >
              <div class="card card-inverse card-info">
                <div class="card-block">
                  <div class="h1 text-muted text-right mb-2">
                    <i class="fas fa-puzzle-piece"/>
                  </div>
                  <div class="h4 mb-0">{{ getRouteLength(route) | numberWithCommas }}</div>
                  <small class="text-muted text-uppercase font-weight-bold">Items on the <strong>{{ route }}</strong>
                    component
                  </small>
                </div>
                <div class="card-footer p-x-1 py-h">
                  <b-link
                    class="font-weight-bold font-xs btn-block text-muted"
                    :to="{ name: 'AdminIndex', params: {'name': route} }">View More <i
                      class="fa fa-angle-right float-right font-lg"/></b-link>
                </div>
              </div>
            </div><!--/.col-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TextFilter from '../filters/textFilters.js'

  export default {
    name: 'Dashboard',
    mixins: [TextFilter],
    methods: {
      getRouteLength (route) {
        const data = window[route + 'Data']
        if (!data || !window[route + 'Schema']) return

        return data.length
      }
    }
  }
</script>
