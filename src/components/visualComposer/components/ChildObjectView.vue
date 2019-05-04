<template>
  <div>
    <div
      class="text-wrapper border"
      v-for="(objectValue, objectKey) in value"
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
</template>

<script>
  import draggable from 'vuedraggable'
  import textFilters from '../../filters/textFilters'

  export default {
    name: 'ChildObjectView',
    components: { draggable },
    mixins: [textFilters],
    props: {
      value: {
        type: [Object],
        required: true,
        default () {
          return []
        }
      }
    }
  }
</script>

<style scoped>

</style>
