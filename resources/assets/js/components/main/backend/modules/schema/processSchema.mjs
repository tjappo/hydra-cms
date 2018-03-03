const config = require('../../../../../../../../config');
import {getSchemaObject} from "./schemaFactory.mjs";
import {extractDataString} from "../ioFunctions.mjs";

/**
 * Initializes the schema and empty data
 * @param {string} title given title of the schema
 * @param {Object[]} items columns of the schema
 * @param res response object
 * @returns {undefined | *[]} Array containing url, empty data and schema
 */
export function initializeSchema(title, items, res) {
    const schemaValues = getSchema(items, res);
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
}

/**
 * Updates the schema and persists it
 * @param {string} title the title of the new schema
 * @param {Object[]} items columns of the schema
 * @param {Object} oldData the old data
 * @param res response object
 * @param {function} callback writing function
 */
export function updateSchema(title, items, oldData, res, callback) {
    const url = config.dataPath + oldData.url,
        schemaOffset = "\n\nwindow['" + title + "Schema'] = ";

    oldData.properties = getSchema(items, res);

    extractDataString(url, title + 'Data', (dataOffset, content) => {
        callback(title, url, dataOffset, content, schemaOffset + JSON.stringify(oldData, null, "\t") + ';', res);
    });
}

/**
 * Returns the generated schema, belonging to the given items
 * @param items given items
 * @param res response object
 * @returns {undefined | Object} Schema belonging to the given items
 */
function getSchema(items, res) {
    let result = {};
    for (let item of items) {
        let temp = getSchemaObject(item, res);
        if (!temp) return;
        result[item.name] = temp;
    }
    return result;
}
