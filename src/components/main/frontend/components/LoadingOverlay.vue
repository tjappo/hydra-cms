<template>
  <div
    id="overlay"
    class="d-flex justify-content-center align-items-center"
    v-if="!!loading">
    <vue-loading
      type="bars"
      color="#57BAC6"
      :size="{ width: '50px', height: '50px' }"/>
  </div>
</template>

<script>
  import vueLoading from 'vue-loading-template'

  export default {
    name: 'LoadingOverlay',
    components: {
      vueLoading
    },
    data () {
      return {
        loading: undefined
      }
    },
    methods: {
      toggleLoading () {
        this.loading = !this.loading
      }
    },
    mounted () {
      VueEventListener.listen('toggleLoading', this.toggleLoading)
    }
  }
</script>

<style lang="scss">
    #overlay {
        position: fixed; /* Sit on top of the page content */
        width: 100%; /* Full width (cover the whole page) */
        height: 100%; /* Full height (cover the whole page) */
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
        z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
        cursor: pointer; /* Add a pointer on hover */
    }
</style>
