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
          <ArrayView
            v-model="data[key]"
            v-if="Array.isArray(value)"
            @setSelected="setSelected"
          />
          <ObjectView
            v-model="data[key]"
            v-else-if="isObject(value)"
            @setSelected="setSelected"
          />
          <EditText
            v-model="data[key]"
            v-else
          />
        </b-card>
        <EditModal v-model="selected" />
      </div>
    </div>
  </div>
</template>

<script>
  import EditModal from './components/EditModal'
  import draggable from 'vuedraggable'
  import textFilters from '../filters/textFilters'
  import ArrayView from './components/ArrayView'
  import ObjectView from './components/ObjectView'
  import EditText from './components/EditText'

  export default {
    name: 'VisualComposerEdit',
    mixins: [textFilters],
    components: {EditText, ObjectView, ArrayView, draggable, EditModal},
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
      setSelected (value) {
        this.selected = value
      },
      isObject (item) {
        return !!item && typeof item === 'object'
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
