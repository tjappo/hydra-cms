import axios from "axios/index";
import config from "../../../../../../../config.mjs";
import * as functions from "../functions.mjs";

/**
 * Checks the sync status of the folder corresponding to the hash
 * @param hash given hash of the data folder
 * @param res response object
 */
export function syncFoldersHash(hash, res) {
    axios.get(config.getIPFSFolder + hash)
        .then((result) => {
            checkFolders(result.data.Objects[0].Links, res);
        })
        .catch((error) => {
            res.status(500).send(error);
            console.log(error);
        });
}

/**
 * Checks if the given folders are up-to-date with the export path
 * Returns an array with the folders that differ
 *  First item of the array is an array containing the remote directories that do not exist locally
 *  Second item of the array is an array containing the local directories that do not exist remote
 *  Third item of the array is an array containing the remote directories that are not up-to-date with local ones
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
    }).catch((error) => res.status(500).send(error));
}

/**
 * Checks whether the local data and remote data are equal
 * @param folder given folder to check
 * @return {Promise<function>} promise whether the local and remote data strings are equal
 */
function checkFiles(folder) {
    return new Promise((resolve, reject) => {
        fs.readFile(config.exportPath + folder.Name + '/data.json.js', (err, data) => {
            axios.get(config.getIPFSFile + folder.Hash + '/data.json.js')
                .then((result) => {
                    (result.data !== data.toString()) ? resolve(folder) : resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
    });
}

export function pushLocalFolder(item, res) {
    const directories = functions.getDirectories(config.exportPath);
    if (directories.indexOf(item) === -1) {
        res.status(500).send('Error: Local folder: ' + item + ' does not exist');
        return;
    }

    axios.post(config.createIPFSFolder, {
        item: item
    }).then((result) => {
        pushFiles();
        res.status(200).send(result.data);
    }).catch((error) => {
        res.status(500).send(error);
    });
}

export function pushFiles(path, result, res) {

}

