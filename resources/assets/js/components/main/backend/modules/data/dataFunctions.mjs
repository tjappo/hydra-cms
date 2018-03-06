import {processFile} from "../ioFunctions.mjs";
import {addContent, editContent, deleteContent} from "./processData.mjs";

/**
 * Creates the new object and persists it
 * @param {string} url path to data file
 * @param {string} varName name of data variable
 * @param {string} newData new data to process
 * @param res response object
 */
export function createContent(url, varName, newData, res) {
    processFile(url, varName, newData, (content, newData, schema, offset, callback) => {
        return addContent(content, newData, varName, schema, offset, callback);
    }, res);
}

/**
 * Updates the object with the new data and persists it
 * @param {string} oldData old data to process
 * @param {string} url path to data file
 * @param {string} varName name of data variable
 * @param {string} newData new data to process
 * @param res response object
 */
export function updateContent(oldData, url, varName, newData, res) {
    processFile(url, varName, newData, (content, newData, schema, offset, callback) => {
        return editContent(oldData, content, newData, varName, schema, offset, callback);
    }, res);
//    (url, offset, content, schema, res)
}

/**
 * Deletes the object with the given id and persists it
 * @param {string} url path to data file
 * @param {string} varName name of data variable
 * @param {string} id new data to process
 * @param res response object
 */
export function removeContent(url, varName, id, res) {
    processFile(url, varName, "", (content, newData, undefined, offset, callback) => {
        return deleteContent(id, content, offset, callback);
    }, res);
}