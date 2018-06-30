<template>
  <b-modal
    v-model="modalShow"
    title="Enter the list items"
    @ok="submitOptions"
    ok-only
  >
    <table class="table">
      <thead>
        <tr>
          <th><strong>Value</strong></th>
          <th/>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in options"
          :key="index"
        >
          <td>
            <input
              type="text"
              class="form-control"
              placeholder="Value"
              v-model="item.value"
            >
          </td>
          <td>
            <font-awesome-icon
              icon="trash-alt"
              class="popover-button"
              aria-hidden="true"
              @click="removeRow(index)"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <button
      type="button"
      class="btn btn-success"
      @click="addColumn()">Add new column
    </button>
  </b-modal>
</template>

<script>
  export default {
    name: 'List',
    data () {
      return {
        modalShow: false,
        id: '',
        options: []
      }
    },
    methods: {
      initialiseModal ([id, options]) {
        this.modalShow = true
        this.id = id
        if (options) {
          this.options = options.map((item) => {
            return {value: item}
          })
        }
      },
      removeRow (index) {
        this.options.splice(index, 1)
      },
      addColumn (value) {
        this.options.push({
          value: value || ''
        })
      },
      findDuplicates (toCheck) {
        const counts = toCheck.reduce((a, b) =>
          Object.assign(a, {[b]: (a[b] || 0) + 1}), {})

        return Object.keys(counts).filter((a) => counts[a] > 1)
      },
      validateOptions () {
        const duplicates = this.findDuplicates(this.flatOptions)
        if (duplicates.length > 0) {
          duplicates.forEach((item) => {
            VueEventListener.fire('error', 'Duplicate key: \'' + item + '\'')
          })
          return false
        }
        return true
      },
      submitOptions (evt) {
        VueEventListener.fire('toggleLoading')
        evt.preventDefault()
        if (!this.validateOptions()) {
          VueEventListener.fire('toggleLoading')
          return
        }

        VueEventListener.fire('addOptions', [this.id, this.flatOptions])
        this.modalShow = false
        VueEventListener.fire('toggleLoading')
        VueEventListener.fire('success', 'Options updated!')
      }
    },
    mounted () {
      VueEventListener.listen('initOptions', this.initialiseModal)
    },
    computed: {
      flatOptions () {
        return this.options.map((item) => item.value)
      }
    }
  }
</script>
