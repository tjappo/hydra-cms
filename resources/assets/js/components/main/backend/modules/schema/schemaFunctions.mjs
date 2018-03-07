import {writeSchema, removeData} from "../ioFunctions.mjs";
import {initializeSchema, updateSchema} from "./processSchema.mjs";

/**
 * Creates the new schema and persists it
 * @param {string} title the title of the new schema
 * @param {Object[]} items columns of the schema
 * @param res response object
 * @param {function} callback writing function
 */
export function addSchema(title, items, res) {
    let [url, dataOffset, schemaOffset, schema] = initializeSchema(title, items, res);
    writeSchema(title, url, dataOffset, [], schemaOffset, schema, res, true);
}

/**
 * Updates the schema and persists it
 * @param {string} title the title of the new schema
 * @param {Object[]} items columns of the schema
 * @param {Object} oldData the old data
 * @param res response object
 */
export function editSchema(title, items, oldData, res) {
    removeData(title, oldData.url, res);
    updateSchema(title, items, oldData, res, writeSchema);
}

/**
 * Deletes the given schema
 * @param {string} title the title of the new schema
 * @param res response object
 */
export function deleteSchema(title, res) {
    removeData(title, title + '/data.json.js', res);
}

