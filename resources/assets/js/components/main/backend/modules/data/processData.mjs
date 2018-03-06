// const hash = require('object-hash');
import hash from 'object-hash';
import {writeImage} from "../ioFunctions.mjs";

/**
 * Temporary variables
 */
let tempVariables = {
    processingImage: [],
};

/**
 * Adds new data to the old existing data
 * @param {Object[]} content existing data
 * @param {Object} newData data to add
 * @param {string} varName name of data variable
 * @param {string} schema schema of the json editor
 * @param {function} callback function
 */
export function addContent(content, newData, varName, schema, callback) {
    schema = extractSchemaObject(schema, varName.substring(0, varName.length - 4));
    newData = validateContent(newData, varName, schema);
    checkProcessingImage((values) => {
        newData = (!!values) ? values : newData;

        newData = setData(schema.properties, newData, undefined);
        newData = Object.assign({"id": content.length + 1}, newData);
        content.push(newData);
        callback(content);
    });
}

/**
 * Edits the data with the new given data
 * @param {Object} oldData old existing data
 * @param {Object[]} content all of the data
 * @param {Object} newData new edited data
 * @param {string} varName name of data variable
 * @param {string} schema schema of the json editor
 * @param {function} callback function
 */
export function editContent(oldData, content, newData, varName, schema, callback) {
    schema = extractSchemaObject(schema, varName.substring(0, varName.length - 4));
    newData = validateContent(newData, varName, schema);
    const index = content.findIndex(x => x.id === oldData.id);

    checkProcessingImage((values) => {
        newData = (!!values) ? values : newData;

        content[index] = setData(schema.properties, newData, oldData);
        content[index] = Object.assign({"id": oldData.id}, content[index]);
        callback(content);
    });
}

/**
 * Deletes the data with the given id
 * @param {string} id given id to delete
 * @param {Object[]} content all of the data
 * @param {function} callback function
 */
export function deleteContent(id, content, callback) {
    content = content.filter(function (item) {
        return item.id !== Number(id);
    });
    callback(content);
}

/**
 * Checks whether the system is still processing images and execute the belonging callback function
 * @param callback callback function to execute
 */
function checkProcessingImage(callback) {
    if (tempVariables.processingImage.length > 0) {
        Promise.all(tempVariables.processingImage).then((values) => {
            callback(values[values.length - 1]);
        });
    } else {
        callback();
    }
}

/**
 * Extracts the schema object from the string and converts it into a json object
 * @param {string} schema schema of the json editor
 * @param name name of the data object
 */
function extractSchemaObject(schema, name) {
    const offset = "window['" + name + "Schema'] = ",
        string = schema.indexOf(offset);
    schema = schema.substring(string + offset.length, schema.length - 1);

    return JSON.parse(schema);
}

/**
 * Validates the content of the given new data
 * @param {Object} newData data to validate
 * @param {string} varName name of data variable
 * @param {string} schema schema of the json editor
 * @returns {Object} validated new data
 */
function validateContent(newData, varName, schema) {
    for (let key of Object.keys(newData)) {
        if (typeof newData[key] !== schema.properties[key].type &&
            (schema.properties[key] === 'integer' && typeof newData[key] !== 'number'))
            throw new Error("Type mismatch error, expected: " + schema.properties[key].type + ", but got: " + typeof newData[key]);
    }
    processImages(newData, varName, schema);
    return newData;
}

/**
 * Process the image files of the given new data
 * @param {Object} newData data to validate
 * @param {string} varName name of data variable
 * @param {string} schema schema of the json editor
 */
function processImages(newData, varName, schema) {
    for (let key of Object.keys(newData)) {
        if (schema.properties[key].media && schema.properties[key].media.binaryEncoding === "base64") {
            const data = newData[key].split(';base64,'),
                extension = data[0].split('/').pop(),
                imageData = data.pop(),
                path = 'img/' + varName.substring(0, varName.length - 4),
                fileName = hash(newData) + '.' + extension,
                tempKey = key;
            processImage(imageData, path, fileName, varName, newData, tempKey);
        }
    }
}

/**
 * Processes one image and adds it to the promise list
 * @param imageData the base 64 encoded image
 * @param path the path to the given file
 * @param fileName name of the file
 * @param varName name of the variable
 * @param newData the new data
 * @param tempKey the key of the given data
 */
function processImage(imageData, path, fileName, varName, newData, tempKey) {
    tempVariables.processingImage.push(
        writeImage(imageData, fileName, varName, newData, tempKey)
    );
}

/**
 * Sets the data in the right order using the schema
 * @param {String[]} keys the possible keys
 * @param {Object} values new values of the concerning schema
 * @param {Object} oldData old data if any
 * @returns {Object}
 */
function setData(keys, values, oldData) {
    let toPush = {};
    Object.keys(keys).forEach((key) => {
        if (key in values) {
            toPush[key] = values[key];
        } else {
            toPush[key] = (!!oldData) ? oldData[key] : null;
        }
    });
    return toPush
}