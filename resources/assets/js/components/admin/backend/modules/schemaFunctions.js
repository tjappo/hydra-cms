let schemaExports = module.exports = {
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
                return schemaExports.getStringObject(item);
            case "number":
                return schemaExports.getBaseObject(item);
            case "date":
                baseObject = schemaExports.getBaseObject(item);
                baseObject.type = 'string';
                baseObject.format = item.type;
                delete baseObject.default;
                return baseObject;
            case "checkbox":
                baseObject = schemaExports.getBaseObject(item);
                baseObject.default = !!item.default;
                baseObject.format = item.type;
                return baseObject;
            case "media":
                baseObject = schemaExports.getBaseObject(item);
                baseObject.type = "string",
                    baseObject.media = {
                        "binaryEncoding": "base64"
                    };
                delete baseObject.default;
                return baseObject;
            case "html":
                stringObject = schemaExports.getStringObject(item);
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
            let temp = schemaExports.getSchemaObject(item, res);
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
     * @returns {undefined | *[]} Array containing url, empty data and schema
     */
    initializeSchema(title, items, res) {
        const schemaValues = schemaExports.getSchema(items, res);
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
        return [url, dataOffset, schemaOffset + JSON.stringify(schema, null, "\t") + ';'];
    },

    /**
     * Creates the new schema and persists it
     * @param {string} title the title of the new schema
     * @param {Object[]} items columns of the schema
     * @param res response object
     * @param {function} callback writing function
     */
    createSchema(title, items, res, callback) {
        let [url, dataOffset, schema] = schemaExports.initializeSchema(title, items, res);

        callback(title, url, dataOffset, [], schema, res, true);
    },

    /**
     * Updates the schema and persists it
     * @param {string} title the title of the new schema
     * @param {Object[]} items columns of the schema
     * @param {Object} oldData the old data
     * @param res response object
     * @param {function} extractDataString the function that extracts the data string
     * @param {function} callback writing function
     */
    updateSchema(title, items, oldData, res, extractDataString, callback) {
        const schemaValues = schemaExports.getSchema(items, res),
            url = config.dataPath + oldData.url,
            schemaOffset = "\n\nwindow['" + title + "Schema'] = ";

        oldData.properties = schemaValues;

        extractDataString(url, title + 'Data', (dataOffset, content) => {
            callback(title, url, dataOffset, content, schemaOffset + JSON.stringify(oldData, null, "\t") + ';', res);
        });
    }
};