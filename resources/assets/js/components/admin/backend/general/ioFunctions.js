const fs = require('fs');
const {join} = require('path');
const config = require('../../../../../../../config');

let IOExports = module.exports = {
    writing: [],

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
     * @param extractDataString the extractDataString function
     * @param res response object
     */
    processFile(url, varName, newData, callback, extractDataString, res) {
        url = config.dataPath + url;
        IOExports.checkFile(url, extractDataString(url, varName,
            (err, offset, content, schema) => {
                callback(content, newData, schema, (content) => {
                    IOExports.writeToFile(url, offset, content, schema);
                    Promise.all(IOExports.writing).then((values) => {
                        res.status(200).send(values[values.length - 1]);
                    });
                });
            }
        ));
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
        IOExports.writing.push(
            new Promise((resolve, reject) => {
                fs.writeFile(url, toWrite, (err) => {
                    if (err) reject(err);
                    resolve(content);
                });
            })
        );
    },

    /**
     * Writes the given schema to the file
     * @param title given title of file
     * @param url given url to write the file to
     * @param dataOffset the data to write
     * @param schema the schema to write
     * @param res response object
     */
    writeSchema(title, url, dataOffset, schema, res) {
        if (!fs.existsSync(config.dataPath + title)) {
            fs.mkdirSync(config.dataPath + title);
            IOExports.writeToFile(config.dataPath + url, dataOffset, [], schema);
            Promise.all(IOExports.writing).then((values) => {
                res.status(200).send(values[values.length - 1]);
            });
        } else {
            res.status(500).send("Error, path already exists: " + url);
        }
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