<template>
  <div class="d-inline">
    <font-awesome-icon
      icon="trash-alt"
      :id="'popoverData-' + id"
      class="popover-button float-right"
      aria-hidden="true"
      @click="popoverToggle"
    />
    <b-popover
      :target="'popoverData-' + id"
      title="Delete Data"
      :show.sync="showPopover">
      <p>Are you sure you want to delete this data?</p>
      <button
        class="btn btn-xs btn-primary"
        @click.prevent.stop="deleteObject">Yes
      </button>
      <button
        class="btn btn-xs btn-danger"
        @click.prevent.stop="popoverToggle">No
      </button>
    </b-popover>
  </div>
</template>

<script>
  import pushData from '../sync/functions/pushData'

  export default {
    name: 'DeleteData',
    mixins: [pushData],
    props: {
      name: {
        type: [String],
        default: ''
      },
      id: {
        type: [String, Number],
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
      deleteObject () {
        VueEventListener.fire('toggleLoading')
        const schema = window[this.name + 'Schema']
        const dataName = this.name + 'Data'
        if (!window[dataName] && !schema) {
          VueEventListener.fire('toggleLoading')
          VueEventListener.fire('error', 'Invalid schema: ' + this.name)
          return
        }

        const numberID = Number(this.id)

        window[dataName].splice(numberID, 1)

        this.pushFile(this.name)

        this.popoverToggle()
        VueEventListener.fire('success', 'Data Deleted')
        VueEventListener.fire('updateData', dataName)
      }
    }
  }
</script>
