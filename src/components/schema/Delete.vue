<template>
  <div>
    <button
      class="btn btn-danger"
      id="schemaPopover"
      @click="popoverToggle">Delete Schema
    </button>
    <b-popover
      target="schemaPopover"
      :title="'Delete Schema: ' + title"
      :show.sync="showPopover">
      <p>Are you sure you want to delete this schema?</p>
      <button
        class="btn btn-xs btn-primary"
        @click.prevent.stop="deleteSchema">Yes
      </button>
      <button
        class="btn btn-xs btn-default"
        @click.prevent.stop="popoverToggle">No
      </button>
    </b-popover>
  </div>
</template>

<script>
  export default {
    name: 'DeleteSchema',
    props: {
      'title': {
        type: [String],
        default: ''
      }
    },
    data () {
      return {
        showPopover: false
      }
    },
    methods: {
      popoverToggle () {
        this.showPopover = !this.showPopover
      },
      deleteSchema () {
        VueEventListener.fire('toggleLoading')

        if (!window[this.title + 'Data'] && !window[this.title + 'Schema']) {
          VueEventListener.fire('toggleLoading')
          VueEventListener.fire('error', 'Invalid schema: ' + this.title)
          return
        }

        window[this.title + 'Data'] = undefined
        window[this.title + 'Schema'] = undefined

        this.removeFile(this.title)

        this.popoverToggle()
        VueEventListener.fire('success', 'Schema Deleted')
        VueEventListener.fire('removeDataChild', this.title)
        this.$router.push({
          name: 'Index'
        })
        this.$router.push({
          name: 'Index'
        })
      }
    }
  }
</script>

<style>

</style>
