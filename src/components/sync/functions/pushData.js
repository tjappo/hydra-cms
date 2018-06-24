import config from 'configFile'
import axios from 'axios'
import helpers from './helpers'

export default {
  mixins: [helpers],
  methods: {
    pushFile (item, callback) {
      if (!this.validateSyncInfo(this.syncInfo)) return

      const that = this
      let params = new FormData()
      params.append('file', new File([this.constructFile(item)], 'data.json.js', {
        type: 'text/plain'
      }))
      axios.post(this.createIPFSLink(that.syncInfo.hash, that.syncInfo.path + '/' + (item.Name || item)), params, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }).then((result) => {
        if (((result.data || {}).response || {}).Hash) {
          that.$store.dispatch('setHash', result.data.response.Hash)
        } else {
          VueEventListener.fire('error', 'Error: Returned invalid hash')
        }
        VueEventListener.fire('toggleLoading')
        if (typeof callback !== 'undefined') callback()
      }).catch((error) => {
        VueEventListener.fire('error', error)
        VueEventListener.fire('toggleLoading')
        if (typeof callback !== 'undefined') callback()
      })
    },
    createIPFSLink (hash, path) {
      return config.createIPFSFile + '?hash=' + hash + '&path=' + path
    },
    validateSyncInfo () {
      if (!this.syncInfo || !this.syncInfo.hash || !this.syncInfo.path) {
        VueEventListener.fire('error', 'Sync info is not valid')
        return false
      }
      return true
    },
    pushImage (file, callback) {
      if (!this.validateSyncInfo(this.syncInfo)) return

      const that = this
      let params = new FormData()
      params.append('file', file)
      axios.post(this.createIPFSLink(that.syncInfo.hash, that.syncInfo.path), params, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }).then((result) => {
        that.$store.dispatch('setHash', result.data.response.Hash)
        VueEventListener.fire('toggleLoading')
        if (typeof callback !== 'undefined') callback()
      }).catch((error) => {
        VueEventListener.fire('error', error)
        VueEventListener.fire('toggleLoading')
        if (typeof callback !== 'undefined') callback(error)
      })
    },
    removeFile (title, callback) {
      if (!this.validateSyncInfo(this.syncInfo)) return

      const that = this
      let params = new FormData()
      axios.post(this.removeIPFSLink(that.syncInfo.hash, that.syncInfo.path + '/' + title + '/data/json.js'), params, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }).then((result) => {
        that.$store.dispatch('setHash', result.data.response.Hash)
        VueEventListener.fire('toggleLoading')
        if (typeof callback !== 'undefined') callback()
      }).catch((error) => {
        VueEventListener.fire('error', error)
        VueEventListener.fire('toggleLoading')
        if (typeof callback !== 'undefined') callback(error)
      })
    },
    removeIPFSLink (hash, path) {
      return config.deleteIPFSFile + '?hash=' + hash + '&path=' + path
    }
  },
  computed: {
    syncInfo () {
      return this.$store.getters.syncInfo
    }
  }
}
