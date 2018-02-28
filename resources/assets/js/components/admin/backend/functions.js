const dataFunctions = require('./modules/dataFunctions');
const schemaFunctions = require('./modules/schemaFunctions');
const ioFunctions = require('./modules/ioFunctions');

module.exports = {

    /**
     * Creates the new object and persists it
     * @param {string} url path to data file
     * @param {string} varName name of data variable
     * @param {string} newData new data to process
     * @param res response object
     */
    createData(url, varName, newData, res) {
        ioFunctions.processFile(url, varName, newData, (content, newData, schema, callback) => {
            return dataFunctions.addContent(content, newData, varName, schema, callback);
        }, dataFunctions.extractDataString, res);
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
        ioFunctions.processFile(url, varName, newData, (content, newData, schema, callback) => {
            return dataFunctions.updateContent(oldData, content, newData, varName, schema, callback);
        }, dataFunctions.extractDataString, res);
    },

    /**
     * Deletes the object with the given id and persists it
     * @param {string} url path to data file
     * @param {string} varName name of data variable
     * @param {string} id new data to process
     * @param res response object
     */
    deleteData(url, varName, id, res) {
        const newData = "";
        ioFunctions.processFile(url, varName, newData, (content, newData, undefined, callback) => {
            return dataFunctions.deleteContent(id, content, callback);
        }, dataFunctions.extractDataString, res);
    },

    /**
     * Creates the new schema and persists it
     * @param {string} title the title of the new schema
     * @param {Object[]} items columns of the schema
     * @param res response object
     */
    createSchema(title, items, res) {
        schemaFunctions.createSchema(title, items, res, ioFunctions.writeSchema);
    },

    /**
     * Creates the new schema and persists it
     * @param {string} title the title of the new schema
     * @param {Object[]} items columns of the schema
     * @param {Object} oldData the old data
     * @param res response object
     */
    updateSchema(title, items, oldData, res) {
        ioFunctions.removeData(title, oldData.url, res);
        schemaFunctions.updateSchema(title, items, oldData, res, dataFunctions.extractDataString, ioFunctions.writeSchema);
    },

    /**
     * Deletes the given schema
     * @param {string} title the title of the new schema
     * @param res response object
     */
    deleteSchema(title, res) {
        ioFunctions.removeData(title, title + '/data.json.js', res);
    },

    /**
     * Gets all the directories within a given source
     * @param source given source
     */
    getDirectories(source) {
        return ioFunctions.getDirectories(source);
    },

};