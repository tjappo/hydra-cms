/**
 * Returns the base string object of a schema
 * @param item given item
 * @returns {{type: string, properties: {en: {type: *, description: *, default: *}}, required: *}}
 */
function getStringObject (item) {
  return {
    'type': 'object',
    'properties': {
      'en': {
        'type': item.type || 'string',
        'description': item.description || '',
        'default': item.default || ''
      }
    },
    'required': item.required || false
  }
}

/**
 * Returns the base string object of a schema
 * @param item given item
 * @returns {{type: *, description: *, default: *, required: *}}
 */
function getBaseObject (item) {
  return {
    'type': item.type || 'string',
    'description': item.description || '',
    'default': item.default || '',
    'required': item.required || false
  }
}

/**
 * Returns the base enum list object of a schema
 * @param item given item
 * @param options given options
 * @returns {{type: *, description: *, default: *, required: *}}
 */
function getSelectObject (item, options) {
  return {
    'type': 'string',
    'enum': options || [],
    'default': item.default || '',
    'required': item.required || false
  }
}

/**
 * Returns the corresponding object to the given item type
 * @param item given item
 * @param res response object
 * @returns {undefined | Object} corresponding schema
 */
function getSchemaObject (item, options) {
  let baseObject, stringObject
  switch (item.type) {
  case 'string':
    return getStringObject(item)
  case 'number':
    return getBaseObject(item)
  case 'select':
    return getSelectObject(item, options)
  case 'date':
    baseObject = getBaseObject(item)
    baseObject.type = 'string'
    baseObject.format = item.type
    delete baseObject.default
    return baseObject
  case 'checkbox':
    baseObject = getBaseObject(item)
    baseObject.type = 'boolean'
    baseObject.default = !!item.default
    baseObject.format = item.type
    return baseObject
  case 'media':
    baseObject = getBaseObject(item)
    baseObject.type = 'string'
    baseObject.media = {
      'binaryEncoding': 'base64'
    }
    delete baseObject.default
    return baseObject
  case 'html':
    stringObject = getStringObject(item)
    stringObject.properties.en.type = 'string'
    stringObject.properties.en.format = item.type
    stringObject.properties.en.options = {
      'wysiwyg': true
    }
    return stringObject
  default:
    VueEventListener.fire('error', 'Error, invalid type: ' + item.type)
  }
}

export default getSchemaObject
