<template>
  <draggable
    v-model="value"
    :options="{group: 'textItems'}"
    class="row">
    <div
      class="item-wrapper cursor-pointer border"
      :class="(!!itemValue.cols) ? 'col-' + itemValue.cols : 'col'"
      v-for="(itemValue, itemKey) in value"
      :key="itemKey"
      @click="setSelected(itemValue)">
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
</template>

<script>
  import draggable from 'vuedraggable'
  import textFilters from '../../filters/textFilters'

  export default {
    name: 'ArrayView',
    components: { draggable },
    mixins: [textFilters],
    props: {
      value: {
        type: [Array],
        required: true,
        default () {
          return []
        }
      }
    },
    methods: {
      setSelected (value) {
        this.$emit('setSelected', value)
      }
    }
  }
</script>

<style scoped>

</style>
