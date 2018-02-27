let exports = module.exports = {
    /**
     * Returns the base string object of a schema
     * @param item given item
     * @returns {{type: string, properties: {en: {type: *, description: *, default: *}}, required: *}}
     */
    getStringObject(item) {
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
    },

    /**
     * Returns the base string object of a schema
     * @param item given item
     * @returns {{type: *, description: *, default: *, required: *}}
     */
    getBaseObject(item) {
        return {
            "type": item.type,
            "description": item.description,
            "default": item.default,
            "required": item.required
        };
    },

    /**
     * Returns the corresponding object to the given item type
     * @param item given item
     * @param res response object
     * @returns {undefined | Object} corresponding schema
     */
    getSchemaObject(item, res) {
        let baseObject, stringObject;
        switch (item.type) {
            case "string":
                return exports.getStringObject(item);
            case "number":
                return exports.getBaseObject(item);
            case "boolean":
                baseObject = exports.getBaseObject(item);
                baseObject.default = !!item.default;
                baseObject.format = "checkbox";
                return baseObject;
            case "upload":
                baseObject = exports.getBaseObject(item);
                baseObject.type = "string",
                    baseObject.media = {
                        "binaryEncoding": "base64"
                    };
                delete baseObject.default;
                return baseObject;
            case "html":
                stringObject = exports.getStringObject(item);
                stringObject.properties.en.type = "string";
                stringObject.properties.en.format = "html";
                stringObject.properties.en.options = {
                    "wysiwyg": true
                };
                return stringObject;
            default:
                res.status(500).send("Error, invalid type: " + item.type);
                return;
        }
    },

    /**
     * Returns the generated schema, belonging to the given items
     * @param items given items
     * @param res response object
     * @returns {undefined | Object} Schema belonging to the given items
     */
    getSchema(items, res) {
        let result = {};
        for (let item of items) {
            let temp = exports.getSchemaObject(item, res);
            if (!temp) return;
            result[item.name] = temp;
        }
        return result;
    },

    /**
     * Initializes the schema and empty data
     * @param {string} title given title of the schema
     * @param {Object[]} items columns of the schema
     * @param res response object
     * @returns {undefined | *[]} Array containing empty data and schema
     */
    initializeSchema(title, items, res) {
        const schemaValues = exports.getSchema(items, res);
        if (!schemaValues) return;

        const dataName = title + "Data",
            dataOffset = "window['" + dataName + "'] = ",
            schemaOffset = "\n\nwindow['" + title + "Schema'] = ",
            url = title + "/data.json.js",
            schema = {
                "title": title + 'Data',
                "url": url,
                "type": "object",
                "properties": schemaValues
            };
        return [dataOffset, schemaOffset + JSON.stringify(schema, null, "\t") + ';'];
    },

    /**
     * Creates the new schema and persists it
     * @param {string} title the title of the new schema
     * @param {Object[]} items columns of the schema
     * @param res response object
     * @param {function} callback writing function
     */
    createSchema(title, items, res, callback) {
        let [dataOffset, schema] = exports.initializeSchema(title, items, res);

        callback(title, dataOffset, schema, res);
    }
};