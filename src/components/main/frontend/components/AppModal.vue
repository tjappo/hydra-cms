<template>
  <div>
    <b-modal
      v-model="modalShow"
      title="Enter the correct merkle hash and path"
      @ok="closeModal"
    >
      <AppAside class="w-100"/>
    </b-modal>
  </div>
</template>

<script>
  import Aside from './Aside.vue'

  export default {
    components: {
      AppAside: Aside
    },
    data () {
      return {
        modalShow: false
      }
    },
    methods: {
      initialiseModal() {
        this.modalShow = true;
      },
      closeModal() {
        this.modalShow = false;
      }
    },
    mounted () {
      VueEventListener.listen('InvalidResponseError', this.initialiseModal)
    }
  }
</script>
