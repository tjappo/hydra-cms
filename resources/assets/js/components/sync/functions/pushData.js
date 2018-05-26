import config from "../../../../../../config.mjs";
import axios from "axios/index";
import helpers from "./helpers";

export default {
    mixins: [helpers],
    methods: {
        pushFile(syncInfo, item) {
            let params = new FormData();
            params.append('file', new File([this.constructFile(item)], 'data.json.js', {
                type: "text/plain"
            }));
            axios.post(this.createIPFSLink(syncInfo.hash, syncInfo.path + "/" + (item.Name || item)), params, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }).then((result) => {
                // console.log(result.data.response);
                // @todo handle hash
                VueEventListener.fire('toggleLoading');
            }).catch((error) => {
                VueEventListener.fire('error', error);
                VueEventListener.fire('toggleLoading');
            });
        },
        createIPFSLink(hash, path) {
            return config.createIPFS + '?hash=' + hash + "&path=" + path;
        }
    }
}