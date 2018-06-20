<template>
  <div class="container wrapper">
    <vue-headful
      :title="metaTitle ||'Shift - Decentralize the web'"
      :description="metaDescription || 'Page meta description'"
    />
    <div class="row justify-content-center">
      <div
        class="col"
        id="accordion"
        v-if="outdated">
        <remote-sync
          v-if="checkArray(outdated.remote)"
          :remote="outdated.remote"/>
        <local-sync
          v-if="checkArray(outdated.local)"
          :local="outdated.local"/>
        <files-sync
          v-if="checkArray(outdated.files)"
          :files="outdated.files"/>
      </div>
    </div>
    <loading-overlay/>
  </div>
</template>

<script>
  import TextFilter from '../filters/textFilters.js'
  import RemoteSync from './Remote'
  import LocalSync from './Local'
  import FilesSync from './Files'
  import LoadingOverlay from '../main/frontend/components/LoadingOverlay'

  export default {
    components: {
      FilesSync,
      LocalSync,
      RemoteSync,
      LoadingOverlay
    },
    mixins: [TextFilter],
    props: {
      'outdated': {
        type: Object,
        default: () => {
        }
      }
    },
    methods: {
      checkArray (item) {
        return (!!item && item.length > 0)
      }
    },
    mounted () {
      if (!this.outdated) {
        this.$router.push({
          name: 'Index'
        })
      }
    }
  }
</script>

<style lang="scss">
  .transparent {
    opacity: 0.5;
  }
</style>
