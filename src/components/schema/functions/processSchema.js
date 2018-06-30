import getSchemaObject from './schemaFactory.js'

export default {
  methods: {
    initialiseSchema ({title, items, options}) {
      const schemaValues = this.getSchema(items, options)
      if (!schemaValues) return

      const schema = {
        'title': title + 'Data',
        'url': title + '/data.json.js',
        'type': 'object',
        'properties': schemaValues
      }

      return schema
    },
    getSchema (items, options) {
      let result = {}
      for (let i = 0; i < items.length; ++i) {
        let temp = getSchemaObject(items[i], options[i])
        if (!temp) return
        result[items[i].name] = temp
      }
      return result
    }
  }
}
