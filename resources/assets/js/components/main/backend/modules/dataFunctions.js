const hash = require('object-hash');
const fs = require('fs');
const config = require('../../../../../../../config');

/**
 * Temporary variables
 */
let tempVariables = {
    processingImage: [],
};

let dataExports = module.exports = {

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
                end = string.indexOf(';\n'),
                dataString = string.substring(start + offset.length, end),
                schema = string.substring(end + 1, string.length),
                content = JSON.parse(dataString);

            (err) ? callback(null, content) : callback(offset, content, schema); // Clean error handler
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
     * Validates the content of the given new data
     * @param {Object} newData data to validate
     * @param {string} varName name of data variable
     * @param {string} schema schema of the json editor
     * @returns {Object} validated new data
     */
    validateContent(newData, varName, schema) {
        for (key of Object.keys(newData)) {
            if (typeof newData[key] !== schema.properties[key].type &&
                (schema.properties[key] === 'integer' && typeof newData[key] !== 'number'))
                throw new Error("Type mismatch error, expected: " + schema.properties[key].type + ", but got: " + typeof newData[key]);
        }
        dataExports.processImages(newData, varName, schema);
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
                dataExports.processImage(imageData, path, fileName, varName, newData, tempKey);
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
            dataExports.writeImage(imageData, fileName, varName, newData, tempKey)
        );
    },

    /**
     * Writes one image and returns it as a promise
     * @param imageData the base 64 encoded image
     * @param fileName name of the file
     * @param varName name of the variable
     * @param newData the new data
     * @param tempKey the key of the given data
     * @retunrs Promise object containing the writing buffer
     */
    writeImage(imageData, fileName, varName, newData, tempKey) {
        return new Promise((resolve, reject) => {
            if (!!imageData) {
                fs.writeFile(config.exportPath + path + '/' + fileName, new Buffer(imageData, "base64"), (err) => {
                    if (err) reject(new Error("Image upload error, at: " + varName));

                    newData[tempKey] = path + '/' + fileName;
                    resolve(newData);
                });
            } else {
                newData[tempKey] = "";
                resolve(newData);
            }
        });
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
        schema = dataExports.extractSchemaObject(schema, varName.substring(0, varName.length - 4));
        newData = dataExports.validateContent(newData, varName, schema);
        dataExports.checkProcessingImage((values) => {
            newData = (!!values) ? values : newData;

            newData = dataExports.setData(schema.properties, newData, undefined);
            newData = Object.assign({"id": content.length + 1}, newData);
            content.push(newData);
            callback(content);
        });
    },

    /**
     * Checks whether the system is still processing images and execute the belonging callback function
     * @param callback callback function to execute
     */
    checkProcessingImage(callback) {
        if (tempVariables.processingImage.length > 0) {
            Promise.all(tempVariables.processingImage).then((values) => {
                callback(values[values.length -1]);
            });
        } else {
            callback();
        }
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
        schema = dataExports.extractSchemaObject(schema, varName.substring(0, varName.length - 4));
        newData = dataExports.validateContent(newData, varName, schema);
        const index = content.findIndex(x => x.id === oldData.id);

        dataExports.checkProcessingImage((values) => {
            newData = (!!values) ? values : newData;

            content[index] = dataExports.setData(schema.properties, newData, oldData);
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
};