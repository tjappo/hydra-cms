import axios from "axios/index";
import config from "../../../../../../../config.mjs";
import fs from 'fs';
import * as functions from "../functions.mjs";
import {checkFileError} from "./errorHandler.mjs";

/**
 * Checks the sync status of the folder corresponding to the hash
 * @param hash given hash of the data folder
 * @param res response object
 */
export function syncFoldersHash(syncInfo, res) {
    axios.get(config.getIPFS, {
        params: {
            hash: syncInfo.hash,
            path: syncInfo.path
        }
    })
        .then((result) => {
            if (!!result.data && !!result.data.response) {
                checkFolders(result.data.response.Objects[0].Links, res);
            } else {
                checkFileError('Error: Invalid result data', res);
            }
        })
        .catch((error) => {
            checkFileError(error, res);
            console.log(error);
        });
}

/**
 * Checks if the given folders are up-to-date with the export path
 * Returns an array with the folders that differ
 *  First item of the array is an array containing the remote directories that do not exist locally
 *  Second item of the array is an array containing the local directories that do not exist remote
 *  Third item of the array is an array containing the remote folders that are not up-to-date with local ones
 * @param folders given folders to check
 * @param res response objects
 */
function checkFolders(folders, res) {
    const directories = functions.getDirectories(config.exportPath);
    const fileNames = folders.map((item) => item.Name);
    let result = [];
    if (directories !== fileNames) {
        result.push(fileNames.filter((folder) => !directories.includes(folder)));
        result.push(directories.filter((folder) => !fileNames.includes(folder)));
    }

    let promises = [];
    for (let folder of folders) {
        promises.push(checkFiles(folder));
    }

    Promise.all(promises).then((values) => {
        result.push(values.filter((item) => !!item));
        res.status(200).send(result);
    }).catch((error) => {
        console.log(error);
        checkFileError(error, res);
    });
}

/**
 * Checks whether the local data and remote data are equal
 * @param folder given folder to check
 * @return {Promise<function>} promise whether the local and remote data strings are equal
 */
function checkFiles(folder) {
    return new Promise((resolve, reject) => {
        fs.readFile(config.exportPath + folder.Name + '/data.json.js', (err, data) => {
            axios.get(config.getIPFSFile, {
                params: {
                    hash: folder.Hash,
                    path: 'data.json.js'
                }
            })
                .then((result) => {
                    (!!result && !!data && result.data.response !== data.toString()) ? resolve(folder) : resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    });
}

/**
 * Gets the local files recursively, given a path
 * @param prefix of the path
 * @param path given path from root
 * @param result the files
 * @param onlyFiles boolean, whether to get only files
 * @return {Array} containing all files and/ or folders
 */
function getLocalFilesRecursively(prefix, path, result, onlyFiles) {
    result = result || [];
    const prefixPath = prefix + path;

    // Does not exist
    if (!fs.existsSync(prefixPath))
        return result;

    if (fs.statSync(prefixPath).isDirectory()) {
        const pathFiles = fs.readdirSync(prefixPath);

        // Directory is empty
        if (pathFiles.length === 0 && !onlyFiles) {
            result.push({
                'Name': path,
                'Type': 1
            })
        } else {
            pathFiles.map((name) => {
                getLocalFilesRecursively(prefix, path + '/' + name, result)
            });
        }
    }
    else {
        result.push({
            'Name': path,
            'Type': 2
        });
    }

    return result;
}

/**
 * Pushes all files recursively
 * @param syncInfo the information to connect to the server
 * @param files all files to push
 * @param res response object
 */
function pushLocalFolderRecursively(syncInfo, files, res) {
    if (files.length === 0) {
        res.sendStatus(200);
        return;
    }

    const file = files.pop();

    if (file.Type === 1) {
        // folder
        axios.post(createIPFSLink(syncInfo.hash, syncInfo.path + '/' + item), {
            content: config.emptyFolderHash
        }).then((result) => {
            syncInfo.hash = result.data.hash;
            pushLocalFolderRecursively(syncInfo, files, res);
        }).catch((error) => {
            checkFileError(error, res);
        });
    } else {
        // file
        pushLocalFile(syncInfo, file.Name, res, (hash) => {
            syncInfo.hash = hash;
            pushLocalFolderRecursively(syncInfo, files, res);
        })
    }
}

/**
 * Pushes the local folder to remote
 * @param syncInfo the information to connect to the server
 * @param path from root to folder
 * @param res response object
 */
export function pushLocalFolder(syncInfo, path, res) {
    const files = getLocalFilesRecursively(config.exportPath, path);

    pushLocalFolderRecursively(syncInfo, files, res);
}

/**
 * Pushes the local file to remote
 * @param syncInfo the information to connect to the server
 * @param item item to push
 * @param res response object
 * @param callback function in case you need to push extra files
 */
export function pushLocalFile(syncInfo, item, res, callback) {
    const prefixPath = config.exportPath + item;
    if (!fs.existsSync(prefixPath)) {
        checkFileError('Error: File does not exist', res);
        return;
    }

    fs.readFile(prefixPath, (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
            return;
        }

        const config = {
            headers: {'content-type': 'multipart/form-data'}
        };

        axios.post(createIPFSLink(syncInfo.hash, syncInfo.path + '/' + item), {
            name: data
        }, config).then((result) => {
            console.log(result);
            (!!callback) ? callback(result.data.hash) : res.status(200).send(hash);
        }).catch((error) => {
            console.log(error);
            checkFileError(error, res);
        });
    });
}

/**
 * Writes the file
 * @param path given path from the root
 * @param data to write
 * @param res response object
 * @param callback function
 */
function writeToFile(path, data, res, callback) {
    fs.writeFile(config.exportPath + path, data, (err) => {
        if (err) reject(checkFileError(err, res));
        (!!callback) ? callback() : res.sendStatus(200);
    });
}

export function pullRemoteFile(syncInfo, item, res, callback) {
    axios.get(config.getIPFSFile, {
        params: {
            hash: syncInfo.hash,
            path: syncInfo.path + '/' + item + '/data.json.js',
        }
    }).then((result) => {
        writeToFile(item + '/data.json.js', result.data.response, res, callback);
    }).catch((error) => {
        checkFileError(error, res);
    });
}

export function pullRemoteFolders(syncInfo, path, res) {
    // pullRemoteFile(syncInfo, path, res);
    axios.get(config.getIPFS, {
        params: {
            hash: syncInfo.hash,
            path: syncInfo.path + '/' + path
        }
    })
        .then((result) => {
            if (!!result.data && !!result.data.response) {
                const items = result.data.response.Objects[0].Links;
                let promises = [];
                for (let item in items) {
                    if (item.Type === 1) {
                        // @todo create folder
                        // folder
                        promises.push(new Promise(
                            (resolve, reject) => {
                                pullRemoteFolders(syncInfo, item, res, () => {
                                })
                                    .then(resolve())
                                    .catch(reject());
                            })
                        );
                    } else {
                        // file
                        promises.push(new Promise(
                            (resolve, reject) => {
                                pullRemoteFile(syncInfo, item, res, () => {
                                })
                                    .then(resolve())
                                    .catch(reject());
                            })
                        );
                    }
                }
                Promise.all(promises)
                    .then(() => {
                        res.sendStatus(200);
                    })
                    .catch((err) => res.status(500).send(err));
            } else {
                checkFileError('Error: Invalid result data', res);
            }
        })
        .catch((error) => {
            checkFileError(error, res);
        });
}

function createIPFSLink(hash, path) {
    return config.createIPFS + '?hash=' + hash + '&path=' + path;
}