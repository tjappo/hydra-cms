<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <b-card
          v-for="(value, key) in data"
          :key="key"
          header-tag="header">
          <div slot="header">
            <span>{{ key | capitalize }}</span>
            <b-btn
              v-if="Array.isArray(value)"
              class="float-right"
              variant="success"
              @click="addItem(key)">Add item
            </b-btn>
          </div>
          <draggable
            v-model="data[key]"
            :options="{group: 'textItems'}"
            class="row"
            v-if="Array.isArray(value)">
            <div
              class="item-wrapper cursor-pointer border"
              :class="(!!itemValue.cols) ? 'col-' + itemValue.cols : 'col'"
              v-for="(itemValue, itemKey) in value"
              :key="itemKey"
              @click="selected = itemValue">
              <div
                class="text-wrapper"
                v-for="(objectValue, objectKey) in itemValue"
                :key="objectKey"
                v-if="objectKey !== 'cols'">
                <h2>{{ objectKey | capitalize }}</h2>
                <div v-if="Array.isArray(objectValue)">
                  <p
                    v-for="(arrayValue, arrayKey) in objectValue"
                    :key="arrayKey">{{ arrayValue | truncate(50) }}</p>
                </div>
                <p v-else>{{ objectValue | truncate(50) }}</p>
              </div>
            </div>
          </draggable>
          <div
            v-else-if="isObject(value)"
            class="row">
            <b-card
              v-for="(itemValue, itemKey) in value"
              :key="itemKey"
              class="item-wrapper p-0"
              :class="(!!itemValue.cols) ? 'col-' + itemValue.cols : (value.length <= 4) ? 'col' : 'col-3'"
              header-tag="header">
              <div slot="header">
                <span>{{ itemKey | capitalize }}</span>
                <b-btn
                  v-if="Array.isArray(itemValue)"
                  class="float-right"
                  variant="success"
                  @click="addItem(key, itemKey)">Add item
                </b-btn>
              </div>
              <draggable
                v-model="data[key][itemKey]"
                :options="{group: 'textItems'}"
                class="row"
                v-if="Array.isArray(itemValue)">
                <div
                  v-for="(arrayValue, arrayKey) in itemValue"
                  :key="arrayKey"
                  class="border w-100"
                  @click="selected = arrayValue">
                  <div
                    class="text-wrapper"
                    v-for="(objectValue, objectKey) in arrayValue"
                    :key="objectKey">
                    <h3>{{ objectKey }}</h3>
                    <div v-if="Array.isArray(objectValue)">
                      <p
                        v-for="(arrayValue, arrayKey) in objectValue"
                        :key="arrayKey">{{ arrayValue | truncate(50) }}</p>
                    </div>
                    <p v-else>{{ objectValue | truncate(50) }}</p>
                  </div>
                </div>
              </draggable>
              <div
                class="text-wrapper border"
                v-for="(objectValue, objectKey) in itemValue"
                :key="objectKey"
                v-else-if="isObject(itemValue)">
                <h3>{{ objectKey }}</h3>
                <div v-if="Array.isArray(objectValue)">
                  <p
                    v-for="(arrayValue, arrayKey) in objectValue"
                    :key="arrayKey">{{ arrayValue | truncate(50) }}</p>
                </div>
                <p v-else>{{ objectValue | truncate(50) }}</p>
              </div>
              <b-form-input
                v-else-if="data[key][itemKey].length <= 75"
                v-model="data[key][itemKey]"/>
              <b-form-textarea
                v-model="data[key][itemKey]"
                :rows="getRows(data[key][itemKey].length)"
                v-else/>
            </b-card>
          </div>
          <b-form-input
            v-else-if="data[key].length <= 75"
            v-model="data[key]"/>
          <b-form-textarea
            v-model="data[key]"
            :rows="getRows(data[key].length)"
            v-else/>
        </b-card>
        <b-modal
          v-model="selectedBool"
          title="Edit item"
          @hidden="onHidden">
          <div
            v-for="(selectedValue, selectedKey) in selected"
            :key="selectedKey"
            class="mb-3">
            <label :for="'modal-' + selectedKey"><strong>{{ selectedKey | capitalize }}</strong></label>
            <div
              v-if="Array.isArray(selectedValue)"
              :id="'modal-' + selectedKey">
              <draggable
                v-model="selected[selectedKey]"
                :options="{group: 'textItems'}"
                class="mb-2">
                <div
                  v-for="(item, key) in selectedValue"
                  :key="key">
                  <b-input-group>
                    <b-form-textarea
                      v-model="selected[selectedKey][key]"
                      :rows="getRows(item.length)"/>
                    <b-input-group-text
                      slot="append"
                      class="cursor-pointer"
                      @click="selectedValue.splice(key, 1)">
                      <font-awesome-icon
                        icon="trash-alt"/>
                    </b-input-group-text>
                  </b-input-group>
                </div>
              </draggable>
              <b-btn
                variant="success"
                @click="selectedValue.push('')">Add
              </b-btn>
            </div>
            <b-form-input
              v-else-if="selectedKey === 'cols'"
              v-model.number="selected[selectedKey]"
              :id="'modal-' + selectedKey"
              type="number"
              min="0"
              max="12"/>
            <b-form-input
              v-else-if="selectedValue.length <= 75"
              v-model="selected[selectedKey]"
              :id="'modal-' + selectedKey"/>
            <b-form-textarea
              v-model="selected[selectedKey]"
              :id="'modal-' + selectedKey"
              :rows="getRows(selectedValue.length)"
              v-else/>
          </div>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import textFilters from '../filters/textFilters'

  export default {
    name: 'VisualComposerEdit',
    mixins: [textFilters],
    components: {draggable},
    props: {
      name: {
        type: String,
        default: '',
        required: true
      },
      dataKey: {
        type: String,
        default: '',
        required: true
      }
    },
    data () {
      return {
        data: undefined,
        selected: undefined
      }
    },
    methods: {
      getRows (length) {
        return Math.ceil(length / 65)
      },
      isObject (item) {
        return !!item && typeof item === 'object'
      },
      addItem (key, internalKey) {
        const data = this.data[key][internalKey] || this.data[key]
        const newObject = this.getCleanObject(data[0])

        data.push(newObject)
      },
      getCleanObject (obj) {
        const res = {}
        for (let key of Object.keys(obj)) {
          if (Array.isArray(obj[key])) {
            res[key] = []
          } else if (typeof obj[key] === 'string') {
            res[key] = ''
          } else if (typeof obj[key] === 'object') {
            res[key] = {}
          } else if (typeof obj[key] === 'number') {
            res[key] = 0
          }
        }
        return res
      },
      onHidden () {
        this.selected = undefined
      }
    },
    computed: {
      selectedBool: {
        get () {
          return !!this.selected
        },
        set () {
        }
      }
    },
    created () {
      if (!this.name || !this.dataKey) {
        this.$router.go(-1)
        return
      }
      this.data = window[this.name]['en'][this.dataKey]
    }
  }
</script>

<style lang="scss">
  .cursor-pointer {
    cursor: pointer;
  }
</style>
