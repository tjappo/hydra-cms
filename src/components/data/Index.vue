<template>
  <div class="animated fadeIn admin-index-wrapper">
    <vue-headful
      :title="metaTitle ||'Shift - Decentralize the web'"
      :description="metaDescription || 'Page meta description'"
    />
    <div class="row justify-content-center">
      <div class="col">
        <div class="card">
          <div class="card-header">
            Overview items of <strong>{{ name | capitalize }}</strong> page
          </div>
          <div class="card-body">
            <div class="button-wrapper mb-3">
              <router-link
                :to="{ name: 'AdminCreate', params: {'name': name}}"
                exact>
                <a
                  href="#"
                  class="btn btn-primary">Create new {{ name | capitalize }} item</a>
              </router-link>
              <delete-schema
                class="float-right"
                :title="name"/>
              <router-link
                :to="{ name: 'SchemaEdit', params: {'name': name}}"
                class="float-right mr-3"
                exact>
                <a
                  href="#"
                  class="btn btn-warning">Edit Schema</a>
              </router-link>
            </div>
            <div
              id="items-wrapper"
              class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      v-for="(key, index) in getKeys"
                      :key="index">{{ key }}
                    </th>
                    <th scope="col">Options</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in data"
                    :key="index">
                    <td
                      :scope="getScope(key)"
                      v-for="(key, index) in getKeys"
                      :key="index">
                      <img
                        :src="exportPath + item[key]"
                        alt="image"
                        v-if="key === 'image' && !!item[key]"
                        height="100px"
                        width="100px">
                      <ul
                        class="list-group"
                        v-else-if="Array.isArray(item[key]) || typeof item[key] === 'object' && !!item[key]">
                        <li
                          class="list-group-item"
                          v-for="(value2, key2) in item[key]"
                          :key="key2">
                          <div class="d-block">
                            <span class="w-50"><strong>{{ key2 }}</strong></span>
                            <span class="w-50 float-right">{{ value2 | truncate(25) }}</span>
                          </div>
                        </li>
                      </ul>
                      <span v-else-if="checkBoolean(item[key])">
                        <span v-if="item[key]">&#10004;</span>
                        <span v-else>&#10006;</span>
                      </span>
                      <span v-else>{{ item[key] | truncate(50) }}</span>
                    </td>
                    <td>
                      <router-link
                        :to="{ name: 'AdminEdit', params: {'name': name, 'id': item.id}}"
                        exact>
                        <font-awesome-icon
                          icon="pencil-alt"
                          aria-hidden="true" />
                      </router-link>
                      <delete-data
                        :name="name"
                        :id="index"/>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TextFilter from '../filters/textFilters'
  import DeleteSchema from '../schema/Delete'
  import DeleteData from './Delete'
  import Config from 'configFile'

  export default {
    components: {
      DeleteData,
      DeleteSchema
    },
    mixins: [TextFilter],
    props: {
      'name': {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        data: undefined,
        exportPath: Config.exportPath
      }
    },
    methods: {
      loadData () {
        const data = this.name + 'Data'

        if (!window[data]) {
          VueEventListener.fire('error', 'Data could not be retrieved from: ' + this.name)
          this.$router.push('/')
        }

        this.data = window[data]
      },
      getScope (key) {
        if (key === 'id') return 'row'
      },
      checkBoolean (input) {
        return (typeof input === 'boolean')
      }
    },
    mounted () {
      this.loadData()
      VueEventListener.listen('updateData', (title) => (this.data = window[title]))
    },
    computed: {
      getKeys () {
        const schema = window[this.name + 'Schema']
        if (typeof this.data !== 'undefined' && this.data.length > 0 && schema) return Object.keys(schema.properties)
      }
    },
    watch: {
      '$route.params.name' () {
        this.loadData()
      }
    }
  }
</script>

<style>
  .popover-button {
    cursor: pointer;
  }

  .card-body .table-responsive {
    border-top: none;
  }
</style>
