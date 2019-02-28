<template>
  <div class="container">
    <div class="row">
      <b-card
        class="w-100"
        header="Components">
        <div class="row">
          <div
            v-for="(value, key) in getKeys(indexData)"
            :key="key"
            class="col-3">
            <div class="card card-inverse card-info">
              <div class="card-block">
                <div class="h1 text-muted text-right mb-2">
                  <font-awesome-icon icon="puzzle-piece"/>
                </div>
                <div class="h4 mb-0">{{ value | capitalize }}</div>
              </div>
              <div class="card-footer p-x-1 py-h">
                <b-link
                  class="font-weight-bold font-xs btn-block text-muted"
                  :to="{ name: 'VisualComposerEdit', params: {name: 'indexData', dataKey: value} }">Edit
                  <font-awesome-icon
                    icon="angle-right"
                    class="float-right font-lg"/>
                </b-link>
              </div>
            </div>
          </div>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
  import TextFilters from '@/components/filters/textFilters'

  export default {
    name: 'VisualComposerIndex',
    mixins: [TextFilters],
    data () {
      return {
        indexData: window['indexData']['en']
      }
    },
    methods: {
      getKeys (item) {
        return Object.keys(item)
      }
    }
  }
</script>

<style scoped>

</style>
