export default {
  methods: {
    constructFile (item) {
      const data = window[(item.Name || item) + 'Data']
      const schema = window[(item.Name || item) + 'Schema']

      if (!data || !schema) return

      const dataToPush = 'window[\'' + (item.Name || item) + 'Data\'] = ' + JSON.stringify(data, null, '\t') + ';'
      const schemaToPush = 'window[\'' + (item.Name || item) + 'Schema\'] = ' + JSON.stringify(schema, null, '\t') + ';'
      const offset = '\n\n// IMPORTANT:\n' +
        '//  title has to be the same as the name of the data variable\n' +
        '//  Url to this file relatively to the root folder\n'

      return dataToPush + offset + schemaToPush
    },
    initialiseImageUploadHandler () {
      const that = this
      // Specify upload handler
      JSONEditor.defaults.options.upload = function (type, file, cbs) {
        VueEventListener.fire('toggleLoading')
        if (!that.validateSyncInfo(that.syncInfo)) {
          VueEventListener.fire('toggleLoading')
          return
        }
        that.syncInfo.path += '/img/' + that.title
        that.pushImage(that.syncInfo, file, (error) => {
          if (error) cbs.failure('Upload failed: ' + error)
          cbs.updateProgress(100)
          cbs.success('/' + that.syncInfo.path + '/' + file.name)
        })
      }
    },
    setMerkleHash (hash) {
      if (typeof (Storage) !== 'undefined') {
        // Code for localStorage/sessionStorage.
        localStorage.setItem('merkle_hash', hash)
      }
      this.$store.dispatch('setHash', hash)
    },
    getMerkleHash (fallback) {
      if (typeof (Storage) !== 'undefined') {
        // Code for localStorage/sessionStorage.
        return localStorage.getItem('merkle_hash') || fallback
      } else {
        return fallback
      }
    }
  }
}
