import getSchemaObject from './schemaFactory.js'

export default {
  methods: {
    initialiseSchema (title, items) {
      const schemaValues = this.getSchema(items)
      if (!schemaValues) return

      const schema = {
        'title': title + 'Data',
        'url': title + '/data.json.js',
        'type': 'object',
        'properties': schemaValues
      }

      return schema
    },
    getSchema (items) {
      let result = {}
      for (let item of items) {
        let temp = getSchemaObject(item)
        if (!temp) return
        result[item.name] = temp
      }
      return result
    }
  }
}
