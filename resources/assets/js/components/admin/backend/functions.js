const {join} = require('path');
const config = require('../../../../../../config');
const dataFunctions = require('./data/dataFunctions');
const schemaFunctions = require('./schema/schemaFunctions');
const ioFunctions = require('./general/ioFunctions');

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
    updateData(oldData, url, varName, newData, res) {
        ioFunctions.processFile(url, varName, newData, (content, newData, schema, callback) => {
            return dataFunctions.updateContent(oldData, content, newData, varName, schema, callback);
        }, res);
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
        }, res);
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