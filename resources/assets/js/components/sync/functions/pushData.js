import config from "../../../../../../config.mjs";
import axios from "axios/index";

export default {
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
        constructFile(item) {
            const data = window[item.Name + 'Data'],
                schema = window[item.Name + 'Schema'];

            if (!data || !schema) return;

            const dataToPush = "window['" + item.Name + "Data'] = " + JSON.stringify(data, null, "\t") + ';',
                schemaToPush = "window['" + item.Name + "Schema'] = " + JSON.stringify(schema, null, "\t") + ';';

            return dataToPush + "\n\n" + schemaToPush;
        },
        createIPFSLink(hash, path) {
            return config.createIPFS + '?hash=' + hash + "&path=" + path;
        }
    }
}