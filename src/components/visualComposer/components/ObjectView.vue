<template>
  <div class="row">
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
      <ChildArrayView
        v-model="value[itemKey]"
        v-if="Array.isArray(itemValue)"
        @setSelected="setSelected"
      />
      <ChildObjectView
        :value="itemValue"
        v-else-if="isObject(itemValue)"
      />
      <EditText
        v-model="value[itemKey]"
        v-else
      />
    </b-card>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import textFilters from '../../filters/textFilters'
  import ChildArrayView from './ChildArrayView'
  import ChildObjectView from './ChildObjectView'
  import EditText from './EditText'

  export default {
    name: 'ObjectView',
    components: { EditText, ChildObjectView, ChildArrayView, draggable },
    mixins: [textFilters],
    props: {
      value: {
        type: [Object],
        required: true,
        default () {
          return []
        }
      }
    },
    methods: {
      setSelected (value) {
        this.$emit('setSelected', value)
      },
      isObject (item) {
        return !!item && typeof item === 'object'
      },
      addItem (key, internalKey) {
        const data = this.value[internalKey] || this.value
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
      }
    }
  }
</script>

<style scoped>

</style>
