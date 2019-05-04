<template>
  <div>
    <b-form-input
      v-if="value.length <= 75"
      v-model="value"/>
    <b-form-textarea
      v-model="value"
      :rows="getRows(value.length)"
      v-else/>
  </div>
</template>

<script>
  export default {
    name: 'EditText',
    props: {
      value: {
        type: String,
        required: true,
        default: ''
      }
    },
    methods: {
      getRows (length) {
        return Math.ceil(length / 65)
      }
    }
  }
</script>

<style scoped>

</style>
