import config from "../../../../../../config.mjs";
import axios from "axios/index";
import helpers from "./helpers";

export default {
    mixins: [helpers],
    methods: {
        pushFile(syncInfo, item) {
            if (!this.validateSyncInfo(syncInfo)) return;

            const that = this;
            let params = new FormData();
            params.append('file', new File([this.constructFile(item)], 'data.json.js', {
                type: "text/plain"
            }));
            axios.post(this.createIPFSLink(syncInfo.hash, syncInfo.path + "/" + (item.Name || item)), params, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }).then((result) => {
                that.$store.dispatch('setHash'. result.data.response.Hash);
                VueEventListener.fire('toggleLoading');
            }).catch((error) => {
                VueEventListener.fire('error', error);
                VueEventListener.fire('toggleLoading');
            });
        },
        createIPFSLink(hash, path) {
            return config.createIPFS + '?hash=' + hash + "&path=" + path;
        },
        validateSyncInfo(syncInfo) {
            if (!syncInfo || !syncInfo.hash || !syncInfo.path) {
                VueEventListener.fire('error', "Sync info is not valid");
                return false;
            }
        },
        pushImage(syncInfo, file, callback) {
            if (!this.validateSyncInfo(syncInfo)) return;

            const that = this;
            let params = new FormData();
            params.append('file', file);
            axios.post(this.createIPFSLink(syncInfo.hash, syncInfo.path + "/" + (file.name)), params, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }).then((result) => {
                that.$store.dispatch('setHash'. result.data.response.Hash);
                VueEventListener.fire('toggleLoading');
                callback();
            }).catch((error) => {
                VueEventListener.fire('error', error);
                VueEventListener.fire('toggleLoading');
                callback(error);
            });
        }
    }
}