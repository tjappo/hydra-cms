const fs = require('fs');
const {join} = require('path');
const hash = require('object-hash');
const config = require('../../../../../../config');

/**
 * Temporary variables
 */
let tempVariables = {
    processingImage: [],
    writing: []
};

module.exports = {

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
     * @returns {Object} corresponding schema
     */
    getSchemaObject(item, res) {
        let baseObject, stringObject;
        switch (item.type) {
            case "string":
                return module.exports.getStringObject(item);
            case "integer":
                return module.exports.getBaseObject(item);
            case "boolean":
                baseObject = module.exports.getBaseObject(item);
                baseObject.default = !!item.default;
                baseObject.format = "checkbox";
                return baseObject;
            case "upload":
                baseObject = module.exports.getBaseObject(item);
                baseObject.media = {
                    "binaryEncoding": "base64"
                };
                delete baseObject.default;
                return baseObject;
            case "html":
                stringObject = module.exports.getStringObject(item);
                stringObject.properties.en.format = "html";
                stringObject.properties.en.options = {
                    "wysiwyg": true
                };
                return stringObject;
            default:
                res.status(500).send("Error, invalid type: " + item.type);
        }

    },

    /**
     * Returns the generated schema, belonging to the given items
     * @param items given items
     * @param res response object
     * @returns {Object} Schema belonging to the given items
     */
    getSchema(items, res) {
        let result = {};
        for (let item of items) {
            result[item.name] = module.exports.getSchemaObject(item, res);
        }
        return result;
    },


    /**
     * Creates the new schema and persists it
     * @param {string} title the title of the new schema
     * @param {Object[]} items columns of the schema
     * @param res response object
     */
    createSchema(title, items, res) {
        const dataName = title + "Data",
            dataOffset = "window['" + dataName + "'] = ",
            schemaOffset = "\n\nwindow['" + title + "Schema'] = ",
            url = config.dataPath + title + "/data.json.js",
            schema = {
                "title": title + 'Data',
                "url": url,
                "type": "object",
                "properties": module.exports.getSchema(items, res)
            };

        if (!fs.existsSync(config.dataPath + title)){
            fs.mkdirSync(config.dataPath + title);
        } else {
            res.status(500).send("Error, path already exists: " + url);
        }
        module.exports.writeToFile(url, dataOffset, [], schemaOffset + JSON.stringify(schema, null, "\t") + ';');
        Promise.all(tempVariables.writing).then((values) => {
            res.status(200).send(values[values.length - 1]);
        });
    },

    /**
     * Creates the new object and persists it
     * @param {string} url path to data file
     * @param {string} varName name of data variable
     * @param {string} newData new data to process
     * @param res response object
     */
    create(url, varName, newData, res) {
        module.exports.processFile(url, varName, newData, (content, newData, schema, callback) => {
            return module.exports.addContent(content, newData, varName, schema, callback);
        }, res);
    },

    /**
     * Updates the object with the new data and persists it
     * @param {string} oldData old data to process
     * @param {string} url path to data file
     * @param {string} varName name of data variable
     * @param {string} newData new data to process
     * @param res response object
     */
    update(oldData, url, varName, newData, res) {
        module.exports.processFile(url, varName, newData, (content, newData, schema, callback) => {
            return module.exports.updateContent(oldData, content, newData, varName, schema, callback);
        }, res);
    },

    /**
     * Deletes the object with the given id and persists it
     * @param {string} url path to data file
     * @param {string} varName name of data variable
     * @param {string} id new data to process
     * @param res response object
     */
    delete(url, varName, id, res) {
        const newData = "";
        module.exports.processFile(url, varName, newData, (content, newData, undefined, callback) => {
            return module.exports.deleteContent(id, content, callback);
        }, res);
    },

    /**
     * Checks the access to the given url
     * Executes the callback function if it is accessible
     * @param {string} url path to data file
     * @param {function} callback callback function
     */
    checkFile(url, callback) {
        fs.access(url, fs.constants.R_OK | fs.constants.W_OK, (err) => {
            if (err) {
                console.error('Error, no access: ' + err);
                return;
            }
            callback;
        });
    },

    /**
     * Process the given file with the new data
     * @param {string} url path to data file
     * @param {string} varName name of data variable
     * @param {string} newData new data to process
     * @param {function} callback function, representing the action
     * @param res response object
     */
    processFile(url, varName, newData, callback, res) {
        url = config.dataPath + url;
        module.exports.checkFile(url, module.exports.extractDataString(url, varName,
            (err, offset, content, schema) => {
                callback(content, newData, schema, (content) => {
                    module.exports.writeToFile(url, offset, content, schema);
                    Promise.all(tempVariables.writing).then((values) => {
                        res.status(200).send(values[values.length - 1]);
                    });
                });
            }
        ));
    },

    /**
     * Splits the data into offset, content and schema
     * @param {string} url path to data file
     * @param {string} varName name of data variable
     * @param {function} callback function
     */
    extractDataString(url, varName, callback) {
        fs.readFile(url, (err, data) => {
            const offset = "window['" + varName + "'] = ",
                string = data.toString(),
                start = string.indexOf(offset),
                end = string.indexOf(';'),
                dataString = string.substring(start + offset.length, end),
                schema = string.substring(end + 1, string.length),
                content = JSON.parse(dataString);

            (err) ? callback(null, content) : callback(err, offset, content, schema); // Clean error handler
        });
    },

    /**
     * Extracts the schema object from the string and converts it into a json object
     * @param {string} schema schema of the json editor
     * @param name name of the data object
     */
    extractSchemaObject(schema, name) {
        const offset = "window['" + name + "Schema'] = ",
            string = schema.indexOf(offset);
        schema = schema.substring(string + offset.length, schema.length - 1);

        return JSON.parse(schema);
    },

    /**
     * Writes the content to the file
     * @param {string} url path to data file
     * @param {string} offset content before the data starts
     * @param {Object[]} content data itself
     * @param {string} schema schema of the json editor
     */
    writeToFile(url, offset, content, schema) {
        const toWrite = offset + JSON.stringify(content, null, "\t") + ';' + schema;
        tempVariables.writing.push(
            new Promise((resolve, reject) => {
                fs.writeFile(url, toWrite, (err) => {
                    if (err) reject(err);
                    resolve(content);
                });
            })
        );
    },

    /**
     * Validates the content of the given new data
     * @param {Object} newData data to validate
     * @param {string} varName name of data variable
     * @param {string} schema schema of the json editor
     * @returns {Object} validated new data
     */
    validateContent(newData, varName, schema) {
        for (key of Object.keys(newData)) {
            if (typeof newData[key] !== schema.properties[key].type)
                throw new Error("Type mismatch error, expected: " + schema.properties[key].type + ", but got: " + newData[key]);
        }
        module.exports.processImages(newData, varName, schema);
        return newData;
    },

    /**
     * Process the image files of the given new data
     * @param {Object} newData data to validate
     * @param {string} varName name of data variable
     * @param {string} schema schema of the json editor
     */
    processImages(newData, varName, schema) {
        for (key of Object.keys(newData)) {
            if (schema.properties[key].media && schema.properties[key].media.binaryEncoding === "base64") {
                const data = newData[key].split(';base64,'),
                    extension = data[0].split('/').pop(),
                    imageData = data.pop(),
                    path = 'img/' + varName.substring(0, varName.length - 4),
                    fileName = hash(newData) + '.' + extension,
                    tempKey = key;
                module.exports.processImage(imageData, path, fileName, varName, newData, tempKey);
            }
        }
    },

    /**
     * Processes one image and adds it to the promise list
     * @param imageData the base 64 encoded image
     * @param path the path to the given file
     * @param fileName name of the file
     * @param varName name of the variable
     * @param newData the new data
     * @param tempKey the key of the given data
     */
    processImage(imageData, path, fileName, varName, newData, tempKey) {
        tempVariables.processingImage.push(
            new Promise((resolve, reject) => {
                if (!!imageData) {
                    fs.writeFile(config.dataPath + path + '/' + fileName, new Buffer(imageData, "base64"), (err) => {
                        if (err) reject(new Error("Image upload error, at: " + varName));

                        newData[tempKey] = path + '/' + fileName;
                        resolve(newData);
                    });
                } else {
                    newData[tempKey] = "";
                    resolve(newData);
                }
            })
        );
    },

    /**
     * Sets the data in the right order using the schema
     * @param {String[]} keys the possible keys
     * @param {Object} values new values of the concerning schema
     * @param {Object} oldData old data if any
     * @returns {Object}
     */
    setData(keys, values, oldData) {
        let toPush = {};
        Object.keys(keys).forEach((key) => {
            if (key in values) {
                toPush[key] = values[key];
            } else {
                toPush[key] = (!!oldData) ? oldData[key] : null;
            }
        });
        return toPush
    },

    /**
     * Adds new data to the old existing data
     * @param {Object[]} content existing data
     * @param {Object} newData data to add
     * @param {string} varName name of data variable
     * @param {string} schema schema of the json editor
     * @param {function} callback function
     */
    addContent(content, newData, varName, schema, callback) {
        schema = module.exports.extractSchemaObject(schema, varName.substring(0, varName.length - 4));
        newData = module.exports.validateContent(newData, varName, schema);
        Promise.all(tempVariables.processingImage).then((values) => {
            values = module.exports.setData(schema.properties, values[values.length - 1], undefined);
            values = Object.assign({"id": content.length + 1}, values);
            content.push(values);
            callback(content);
        });
    },

    /**
     * Edits the data with the new given data
     * @param {Object} oldData old existing data
     * @param {Object[]} content all of the data
     * @param {Object} newData new edited data
     * @param {string} varName name of data variable
     * @param {string} schema schema of the json editor
     * @param {function} callback function
     */
    updateContent(oldData, content, newData, varName, schema, callback) {
        schema = module.exports.extractSchemaObject(schema, varName.substring(0, varName.length - 4));
        newData = module.exports.validateContent(newData, varName, schema);
        const index = content.findIndex(x => x.id === oldData.id);
        Promise.all(tempVariables.processingImage).then((values) => {
            content[index] = module.exports.setData(schema.properties, values[values.length - 1], oldData);
            content[index] = Object.assign({"id": oldData.id}, content[index]);
            callback(content);
        });
    },

    /**
     * Deletes the data with the given id
     * @param {string} id given id to delete
     * @param {Object[]} content all of the data
     * @param {function} callback function
     */
    deleteContent(id, content, callback) {
        content = content.filter(function (item) {
            return item.id !== Number(id);
        });
        callback(content);
    },

    /**
     * Gets all the directories within a given source
     * @param source given source
     */
    getDirectories(source) {
        const isDirectory = source => {
            return fs.lstatSync(source).isDirectory()
        };
        return fs.readdirSync(source).map(name => join(source, name)).filter(isDirectory).map(source => source.replace(config.dataPath, ''));
    },

};