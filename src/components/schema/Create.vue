<template>
  <div class="container wrapper">
    <vue-headful
      :title="metaTitle ||'Shift - Decentralize the web'"
      :description="metaDescription || 'Page meta description'"
    />
    <div class="row justify-content-center">
      <div class="col">
        <div class="card w-100">
          <div class="card-header">
            Create new schema: <strong>{{ data.title | lowerCase }}</strong>
          </div>
          <form>
            <div class="card-body">
              <div class="form-group">
                <label for="title">Title</label>
                <input
                  id="title"
                  type="text"
                  class="form-control"
                  v-model="data.title"
                  required>
              </div>
              <table
                class="table"
                v-if="itemsExists">
                <thead>
                  <tr>
                    <td><strong>Name</strong></td>
                    <td><strong>Type</strong></td>
                    <td><strong>Description</strong></td>
                    <td><strong>Default value</strong></td>
                    <td><strong>Required</strong></td>
                    <td />
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in data.items"
                    :key="index">
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Name"
                        v-model="item.name"
                        required>
                    </td>
                    <td>
                      <select
                        class="form-control"
                        required
                        v-model="item.type">
                        <option
                          v-for="(value, key) in types"
                          :key="key"
                          :value="key"
                          :selected="value === 'string'">{{ value }}
                        </option>
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="Description"
                        v-model="item.description">
                    </td>
                    <td>
                      <div
                        class="switch-wrapper"
                        v-if="checkBoolean(checkType(item.type))">
                        <input
                          :type="checkType(item.type)"
                          class="form-control switch-checkbox"
                          placeholder="Default value"
                          v-model="item.default"
                          :id="'default' + index">
                        <label
                          class="switch-label"
                          :for="'default' + index">&nbsp;</label>
                      </div>
                      <input
                        v-else
                        :type="checkType(item.type)"
                        class="form-control"
                        v-model="item.default">
                    </td>
                    <td>
                      <div class="switch-wrapper">
                        <input
                          :id="'required-' + index"
                          type="checkbox"
                          class="switch-checkbox"
                          v-model="item.required">
                        <label
                          class="switch-label"
                          :for="'required-' + index">required</label>
                      </div>
                    </td>
                    <td>
                      <i
                        class="popover-button fas fa-trash-alt"
                        aria-hidden="true"
                        @click="removeRow(index)" />
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                type="button"
                class="btn btn-success"
                @click="addColumn()">Add new column
              </button>
            </div>
            <div class="card-footer">
              <input
                type="submit"
                class="btn btn-primary"
                @click.prevent="submitForm"
                value="Submit">
              <b-link
                class="btn btn-secondary float-right"
                :to="{name: 'Index'}">Cancel
              </b-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TextFilter from '../filters/textFilters.js'
  import SchemaFilter from './components/schemaFilters'
  import processSchema from './functions/processSchema'
  import pushData from '../sync/functions/pushData'

  export default {
    mixins: [TextFilter, SchemaFilter, processSchema, pushData],
    methods: {
      submitForm () {
        VueEventListener.fire('toggleLoading')
        if (!this.validateForm()) {
          VueEventListener.fire('toggleLoading')
          return
        }

        window[this.data.title + 'Data'] = []
        window[this.data.title + 'Schema'] = this.initialiseSchema(this.data.title, this.data.items)

        this.pushFile(this.data.title)
        VueEventListener.fire('success', 'Schema Created')
        VueEventListener.fire('addDataChild', this.data.title)
        this.$store.dispatch('addDataRoute', this.data.title)
        this.$router.push({
          name: 'Index'
        })
      }
    }
  }
</script>
