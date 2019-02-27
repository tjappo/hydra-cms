<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <b-card
          v-for="(value, key) in index[dataKey]"
          :key="key"
          header-tag="header"
        >
          <div slot="header">
            <span>{{ key | capitalize }}</span>
            <b-btn
              class="float-right"
              variant="success"
              @click="addItem(key)"
            >Add item
            </b-btn>
          </div>
          <draggable
            v-model="index[key]"
            :options="{group: 'textItems'}"
            class="row"
            v-if="isArray(value)"
          >
            <div
              class="item-wrapper cursor-pointer"
              :class="(!!itemValue.cols) ? 'col-' + itemValue.cols : 'col'"
              v-for="(itemValue, itemKey) in value"
              :key="itemKey"
              @click="selected = itemValue"
            >
              <div
                class="text-wrapper"
                v-for="(objectValue, objectKey) in itemValue"
                :key="objectKey"
                v-if="objectKey !== 'cols'"
              >
                <h1>{{ objectKey | capitalize }}</h1>
                <div v-if="isArray(objectValue)">
                  <p
                    v-for="(arrayValue, arrayKey) in objectValue"
                    :key="arrayKey">{{ arrayValue | truncate(50) }}</p>
                </div>
                <p v-else>{{ objectValue | truncate(50) }}</p>
              </div>
            </div>
          </draggable>
        </b-card>
        <b-modal
          v-model="selectedBool"
          title="Edit item"
          @hidden="onHidden"
        >
          <div
            v-for="(selectedValue, selectedKey) in selected"
            :key="selectedKey"
            class="mb-3"
          >
            <label :for="'modal-' + selectedKey"><strong>{{ selectedKey | capitalize }}</strong></label>
            <div
              v-if="isArray(selectedValue)"
              :id="'modal-' + selectedKey"
            >
              <draggable
                v-model="selected[selectedKey]"
                :options="{group: 'textItems'}"
                class="mb-2"
              >
                <div
                  v-for="(item, key) in selectedValue"
                  :key="key">
                  <b-input-group>
                    <b-form-textarea
                      v-model="selected[selectedKey][key]"
                      :rows="getRows(item.length)"
                    />
                    <b-input-group-text
                      slot="append"
                      class="cursor-pointer"
                      @click="selectedValue.splice(key, 1)"
                    >
                      <font-awesome-icon
                        icon="trash-alt"/>
                    </b-input-group-text>
                  </b-input-group>
                </div>
              </draggable>
              <b-btn
                variant="success"
                @click="selectedValue.push('')">Add</b-btn>
            </div>
            <b-form-input
              v-else-if="selectedKey === 'cols'"
              v-model.number="selected[selectedKey]"
              :id="'modal-' + selectedKey"
              type="number"
              min="0"
              max="12"
            />
            <b-form-input
              v-else-if="selectedValue.length <= 75"
              v-model="selected[selectedKey]"
              :id="'modal-' + selectedKey"
            />
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
    name: 'VisualComposer',
    mixins: [textFilters],
    components: {draggable},
    data () {
      return {
        dataKey: 'why',
        index: {
          why: {
            items: [
              {
                title: 'What do successful operating systems have in common?',
                descriptions: [
                  'Consider the earliest example of a “killer app”: the VisiCalc spreadsheet software catapulted Apple II personal computers to unprecedented levels of adoption in the early 80s, simply because for ten months, the best spreadsheet software on the market was only available for the Apple II.',
                  'Likewise, Microsoft invested heavily in promoting Internet Explorer as a user-friendly application with mass appeal because they understood that even without making IE the best browser on the market, including it as a built-in perk with Windows would facilitate adoption of both their application and their OS, driving software developers to follow suit in a snowballing effect which helped to make market dominance all but inevitable.'
                ],
                cols: 6
              },
              {
                title: 'Shift is the first next-gen blockchain with a built-in “killer dApp.”',
                descriptions: [
                  'While other companies are busy writing whitepapers and raising hundreds of millions of dollars, Shift has been busy working: we have created the backbone of a robust dApp ecosystem, with a strong and democratic dPOS platform of decentralization that can be used by anyone who knows JavaScript. The Phantom dApp with Shift will create a new decentralized web, empowering everyday users and keeping their content safe.',
                  'We are confident that providing the first low cost, easy-to-use decentralized hosting infrastructure, which saves users money over traditional file storage methods and protects their content from external censorship, will act as a massive stimulus for the mainstream adoption of Shift.'
                ],
                cols: 6
              }
            ]
          }
        },
        selected: undefined
      }
    },
    methods: {
      getRows (length) {
        return Math.ceil(length / 65)
      },
      isArray (item) {
        return Array.isArray(item)
      },
      addItem (key) {
        const newObject = this.getCleanObject(this.index[this.dataKey][key][0])

        this.index[this.dataKey][key].push(newObject)
      },
      getCleanObject (obj) {
        const res = {}
        for (let key of Object.keys(obj)) {
          if (this.isArray(obj[key])) {
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
        set () {}
      }
    }
  }
</script>

<style lang="scss">
  .cursor-pointer {
    cursor: pointer;
  }
</style>
