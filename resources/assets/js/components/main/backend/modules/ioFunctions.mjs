import config from '../../../../../../../config';
import fs from 'fs';
import path from 'path';
import {checkFileError} from './errorHandler';

let writing = [];

/**
 * Writes one image and returns it as a promise
 * @param imageData the base 64 encoded image
 * @param fileName name of the file
 * @param varName name of the variable
 * @param newData the new data
 * @param tempKey the key of the given data
 * @retunrs Promise object containing the writing buffer
 */
export function writeImage(imageData, fileName, varName, newData, tempKey) {
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
}

/**
 * Splits the data into offset, content and schema
 * @param {string} url path to data file
 * @param {string} varName name of data variable
 * @param {function} callback function
 */
export function extractDataString(url, varName, callback) {
    fs.readFile(url, (err, data) => {
        const offset = "window['" + varName + "'] = ",
            string = data.toString(),
            start = string.indexOf(offset),
            end = string.indexOf(';\n'),
            dataString = string.substring(start + offset.length, end),
            schema = string.substring(end + 1, string.length),
            content = JSON.parse(dataString);

        checkFileError(err);

        callback(offset, content, schema);
    });
}

/**
 * Process the given file with the new data
 * @param {string} url path to data file
 * @param {string} varName name of data variable
 * @param {string} newData new data to process
 * @param {function} callback function, representing the action
 * @param res response object
 */
export function processFile(url, varName, newData, callback, res) {
    url = config.exportPath + url;
    checkFile(url, extractDataString(url, varName, (offset, content, schema) => {
            processContent(offset, content, newData, schema, url, callback, res);
        })
    );
}

/**
 * Writes the given schema to the file
 * @param title given title of file
 * @param url given url to write the file to
 * @param dataOffset the data offset to write
 * @param data the data to write
 * @param schema the schema to write
 * @param res response object
 * @param checkDir variable to check the dir
 */
export function writeSchema(title, url, dataOffset, data, schema, res, checkDir) {
    if (checkDir && !fs.existsSync(config.exportPath + title)) {
        fs.mkdir(config.exportPath + title, (err) => {
            checkFileError(err);

            writeContent(config.exportPath + url, dataOffset, data, schema, res);
        });

    } else {
        res.status(500).send("Error, path already exists: " + url);
    }
}

/**
 * Removes the given directory and title
 * @param title given title of the file
 * @param url given url of the directory
 * @param res response object
 */
export function removeData(title, url, res) {
    url = config.exportPath + url;
    title = config.exportPath + title;
    if (fs.existsSync(url)) {
        fs.unlinkSync(url);
        fs.rmdirSync(title);
    } else {
        res.status(500).send("Error, reading file: " + url);
    }
}

/**
 * Gets all the directories within a given source
 * @param source given source
 */
export function getDirectoriesFromSource(source) {
    const isDirectory = source => {
        return fs.lstatSync(source).isDirectory()
    };
    return fs.readdirSync(source).map(name => path.join(source, name)).filter(isDirectory).map(source => source.replace(config.exportPath, ''));
}

/**
 * Checks the access to the given url
 * Executes the callback function if it is accessible
 * @param {string} url path to data file
 * @param {void} callback callback function
 */
function checkFile(url, callback) {
    fs.access(url, fs.constants.R_OK | fs.constants.W_OK, (err) => {
        checkFileError(err);
        callback;
    });
}

/**
 * Updates the content with the callback action and passes the writing action
 * @param {string} offset content before the data starts
 * @param {Object[]} content data itself
 * @param {Object} newData new updated data
 * @param {string} schema schema of the json editor
 * @param {string} url path to data file
 * @param {function} callback function, representing the action
 * @param res response object
 */
function processContent(offset, content, newData, schema, url, callback, res) {
    callback(content, newData, schema, (content) =>
        writeContent(url, offset, content, schema, res));
}

/**
 * Writes the given content away
 * @param {string} url path to data file
 * @param {string} offset content before the data starts
 * @param {Object[]} content data itself
 * @param {string} schema schema of the json editor
 * @param res response object
 */
function writeContent(url, offset, content, schema, res) {
    writeToFile(url, offset, content, schema);
    Promise.all(writing).then((values) => {
        res.status(200).send(values[values.length - 1]);
    });
}

/**
 * Writes the content to the file
 * @param {string} url path to data file
 * @param {string} offset content before the data starts
 * @param {Object[]} content data itself
 * @param {string} schema schema of the json editor
 */
function writeToFile(url, offset, content, schema) {
    const toWrite = offset + JSON.stringify(content, null, "\t") + ';' + schema;
    writing.push(
        new Promise((resolve, reject) => {
            fs.writeFile(url, toWrite, (err) => {
                if (err) reject(checkFileError(err));
                resolve(content);
            });
        })
    );
}