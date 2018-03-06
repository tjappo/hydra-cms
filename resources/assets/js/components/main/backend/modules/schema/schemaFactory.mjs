/**
 * Returns the base string object of a schema
 * @param item given item
 * @returns {{type: string, properties: {en: {type: *, description: *, default: *}}, required: *}}
 */
function getStringObject(item) {
    return {
        "type": "object",
        "properties": {
            "en": {
                "type": item.type,
                "description": item.description,
                "default": item.default,
            }
        },
        "required": item.required
    };
}

/**
 * Returns the base string object of a schema
 * @param item given item
 * @returns {{type: *, description: *, default: *, required: *}}
 */
function getBaseObject(item) {
    return {
        "type": item.type,
        "description": item.description,
        "default": item.default,
        "required": item.required
    };
}

/**
 * Returns the corresponding object to the given item type
 * @param item given item
 * @param res response object
 * @returns {undefined | Object} corresponding schema
 */
export function getSchemaObject(item, res) {
    let baseObject, stringObject;
    switch (item.type) {
        case "string":
            return getStringObject(item);
        case "number":
            return getBaseObject(item);
        case "date":
            baseObject = getBaseObject(item);
            baseObject.type = 'string';
            baseObject.format = item.type;
            delete baseObject.default;
            return baseObject;
        case "checkbox":
            baseObject = getBaseObject(item);
            baseObject.default = !!item.default;
            baseObject.format = item.type;
            return baseObject;
        case "media":
            baseObject = getBaseObject(item);
            baseObject.type = "string",
                baseObject.media = {
                    "binaryEncoding": "base64"
                };
            delete baseObject.default;
            return baseObject;
        case "html":
            stringObject = getStringObject(item);
            stringObject.properties.en.type = "string";
            stringObject.properties.en.format = item.type;
            stringObject.properties.en.options = {
                "wysiwyg": true
            };
            return stringObject;
        default:
            res.status(500).send("Error, invalid type: " + item.type);
            return;
    }
}