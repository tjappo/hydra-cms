import {createContent, updateContent, removeContent} from "./modules/data/dataFunctions.mjs";
import {addSchema, editSchema, deleteSchema} from "./modules/schema/schemaFunctions.mjs";
import {getDirectoriesFromSource, syncFoldersHash} from "./modules/ioFunctions.mjs";

/**
 * Creates the new object and persists it
 * @param {string} url path to data file
 * @param {string} varName name of data variable
 * @param {string} newData new data to process
 * @param res response object
 */
export function createData(url, varName, newData, res) {
    createContent(url, varName, newData, res);
}

/**
 * Updates the object with the new data and persists it
 * @param {string} oldData old data to process
 * @param {string} url path to data file
 * @param {string} varName name of data variable
 * @param {string} newData new data to process
 * @param res response object
 */
export function updateData(oldData, url, varName, newData, res) {
    updateContent(oldData, url, varName, newData, res);
}

/**
 * Deletes the object with the given id and persists it
 * @param {string} url path to data file
 * @param {string} varName name of data variable
 * @param {string} id new data to process
 * @param res response object
 */
export function deleteData(url, varName, id, res) {
    removeContent(url, varName, id, res);
}

/**
 * Creates the new schema and persists it
 * @param {string} title the title of the new schema
 * @param {Object[]} items columns of the schema
 * @param res response object
 */
export function createSchema(title, items, res) {
    addSchema(title, items, res);
}

/**
 * Creates the new schema and persists it
 * @param {string} title the title of the new schema
 * @param {Object[]} items columns of the schema
 * @param {Object} oldData the old data
 * @param res response object
 */
export function updateSchema(title, items, oldData, res) {
    editSchema(title, items, oldData, res);
}

/**
 * Deletes the given schema
 * @param {string} title the title of the new schema
 * @param res response object
 */
export function removeSchema(title, res) {
    deleteSchema(title, res);
}

export function syncFolders(hash, res) {
    syncFoldersHash(hash, res);
}

/**
 * Gets all the directories within a given source
 * @param source given source
 */
export function getDirectories(source) {
    return getDirectoriesFromSource(source);
}