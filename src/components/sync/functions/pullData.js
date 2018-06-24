import config from 'configFile'

export default {
  methods: {
    pullFile (item, callback) {
      axios.get(config.getIPFSFile, {
        params: {
          hash: this.syncInfo.hash,
          path: this.syncInfo.path + '/' + item.Name + '/data.json.js'
        }
      }).then((result) => {
        const temp = this.getDataString(result.data.response, item.Name)
        const data = temp[0]
        const schema = this.getSchemaString(temp[1], item.Name)
        if (!!data && !!schema) {
          window[item.Name + 'Data'] = data
          window[item.Name + 'Schema'] = schema
        }
        if (typeof callback !== 'undefined') callback()
        VueEventListener.fire('toggleLoading')
      }).catch((error) => {
        VueEventListener.fire('error', error)
      })
    },
    pullFolder () {
      const that = this
      axios.get(config.getIPFSFolder, {
        params: this.syncInfo
      })
        .then((result) => {
          if (((((result.data || {}).response || {}).Objects || [])[0] || {}).Links) {
            const folders = result.data.response.Objects[0].Links
            folders.forEach((folder) => {
              if (folder.Name !== 'img') {
                that.pullFile(folder, () => that.$store.dispatch('addDataRoute', folder.Name))
              }
            })
          } else {
            VueEventListener.fire('InvalidResponseError')
            VueEventListener.fire('error', 'Invalid response when pulling folder')
          }
        })
        .catch((error) => {
          VueEventListener.fire('error', 'Error loading data: ' + error)
        })
    },
    getDataString (string, name) {
      const offset = 'window[\'' + name + 'Data\'] = '
      const start = string.indexOf(offset)
      const end = string.indexOf(';\n')
      const dataString = string.substring(start + offset.length, end)
      const schemaString = string.substring(end + 1, string.length)
      try {
        return [
          JSON.parse(dataString),
          schemaString]
      } catch (e) {
        console.log(e)
        VueEventListener.fire('error', 'Error while parsing data JSON of ' + name)
      }
    },
    getSchemaString (string, name) {
      const offset = 'window[\'' + name + 'Schema\'] = '
      const start = string.indexOf(offset)
      const end = string.indexOf(';')
      const schemaString = string.substring(start + offset.length, end)
      try {
        return JSON.parse(schemaString)
      } catch (e) {
        VueEventListener.fire('error', 'Error while parsing schema JSON of ' + name)
      }
    }
  },
  computed: {
    syncInfo () {
      return this.$store.getters.syncInfo
    }
  }
}
