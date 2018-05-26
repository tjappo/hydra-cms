import config from "../../../../../../config.mjs";
import axios from "axios/index";
import helpers from "./helpers";

export default {
    mixins: [helpers],
    methods: {
        pushFile(syncInfo, item) {
            axios.post(this.createIPFSLink(syncInfo.hash, syncInfo.path + "/" + item.Name), {
                file: new File([this.constructFile(item)], 'data.json.js', {
                    type: "text/plain"
                })
            }).then((result) => {
                console.log(result);
                VueEventListener.fire('toggleLoading');
                // (!!callback) ? callback(result.data.hash) : res.status(200).send(hash);
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