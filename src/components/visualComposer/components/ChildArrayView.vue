<template>
  <draggable
    v-model="value"
    :options="{group: 'textItems'}"
    class="row"
    v-if="Array.isArray(value)">
    <div
      v-for="(arrayValue, arrayKey) in value"
      :key="arrayKey"
      class="border w-100"
      @click="setSelected(arrayValue)">
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
</template>

<script>
  import draggable from 'vuedraggable'
  import textFilters from '../../filters/textFilters'

  export default {
    name: 'ChildArrayView',
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
