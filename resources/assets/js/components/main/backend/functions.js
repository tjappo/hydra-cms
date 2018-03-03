import {createContent, updateContent, deleteContent} from "./modules/data/dataFunctions.mjs";
import {addSchema, editSchema, deleteSchema} from "./modules/schema/schemaFunctions.mjs";
import {getDirectories} from "./modules/ioFunctions.mjs";

module.exports = {

    /**
     * Creates the new object and persists it
     * @param {string} url path to data file
     * @param {string} varName name of data variable
     * @param {string} newData new data to process
     * @param res response object
     */
    createData(url, varName, newData, res) {
        createContent(url, varName, newData, res);
    },

    /**
     * Updates the object with the new data and persists it
     * @param {string} oldData old data to process
     * @param {string} url path to data file
     * @param {string} varName name of data variable
     * @param {string} newData new data to process
     * @param res response object
     */
    updateData(oldData, url, varName, newData, res) {
        updateContent(oldData, url, varName, newData, res);
    },

    /**
     * Deletes the object with the given id and persists it
     * @param {string} url path to data file
     * @param {string} varName name of data variable
     * @param {string} id new data to process
     * @param res response object
     */
    deleteData(url, varName, id, res) {
        deleteContent(url, varName, id, res);
    },

    /**
     * Creates the new schema and persists it
     * @param {string} title the title of the new schema
     * @param {Object[]} items columns of the schema
     * @param res response object
     */
    createSchema(title, items, res) {
        addSchema(title, items, res);
    },

    /**
     * Creates the new schema and persists it
     * @param {string} title the title of the new schema
     * @param {Object[]} items columns of the schema
     * @param {Object} oldData the old data
     * @param res response object
     */
    updateSchema(title, items, oldData, res) {
        editSchema(title, items, oldData, res);
    },

    /**
     * Deletes the given schema
     * @param {string} title the title of the new schema
     * @param res response object
     */
    deleteSchema(title, res) {
        deleteSchema(title, res);
    },

    /**
     * Gets all the directories within a given source
     * @param source given source
     */
    getDirectories(source) {
        return getDirectories(source);
    },

};