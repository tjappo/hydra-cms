import axios from "axios";
import config from "configFile";
import helpers from "./helpers";

export default {
    mixins: [helpers],
    methods: {
        getFolders(syncInfo, callback) {
            axios.get(config.getIPFS, {
                params: {
                    hash: syncInfo.hash,
                    path: syncInfo.path
                }
            })
                .then((result) => {
                    if (!!result.data && !!result.data.response) {
                        if (!!callback)
                            callback(result.data.response.Objects[0].Links);
                        else
                            return result.data.response.Objects[0].Links;
                    } else {
                        VueEventListener.fire('error', "Invalid result data");
                    }
                })
                .catch((error) => {
                    VueEventListener.fire('error', error);
                });
        },
        getSyncInfo(syncInfo) {
            this.getFolders(syncInfo, (folders) => this.checkFolders(folders));
        },
        setSyncInfo(result) {
            this.outdated.remote = result[0];
            this.outdated.local = result[1];
            this.outdated.files = result[2];
            this.outdated.timestamp = moment();
            this.loading = false;
        },
        checkFolders(folders) {
            const directories = this.getAllData();
            const fileNames = folders.map((item) => item.Name);
            let result = [];
            if (directories !== fileNames) {
                result.push(fileNames.filter((folder) => !directories.includes(folder)));
                result.push(directories.filter((folder) => !fileNames.includes(folder)));
            }

            let promises = [];
            for (let folder of folders) {
                promises.push(this.checkFiles(folder));
            }

            Promise.all(promises).then((values) => {
                result.push(values.filter((item) => !!item));
                this.setSyncInfo(result);
            }).catch((error) => {
                VueEventListener.fire('error', error);
            });
        },
        checkFiles(folder) {
            const data = this.constructFile(folder);
            return new Promise((resolve, reject) => {
                axios.get(config.getIPFSFile, {
                    params: {
                        hash: folder.Hash,
                        path: 'data.json.js'
                    }
                })
                    .then((result) => {
                        (!!result && !!data && result.data.response !== data) ? resolve(folder) : resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        },
        getAllData() {
            let substr, result = [];
            for (let element in window) {
                substr = element.slice(0, -4);
                if (element.substr(-4) === 'Data' && !!window[substr + "Schema"]) {
                    result.push(substr);
                }
            }
            return result;
        }
    }
}
