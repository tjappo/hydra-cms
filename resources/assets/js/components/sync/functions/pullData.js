import config from "../../../../../../config.mjs";

export default {
    methods: {
        pullFile(syncInfo, item) {
            axios.get(config.getIPFSFile, {
                params: {
                    hash: syncInfo.hash,
                    path: syncInfo.path + '/' + item.Name + '/data.json.js',
                }
            }).then((result) => {
                const temp = this.getDataString(result.data.response, item.Name),
                    data = temp[0],
                    schema = this.getSchemaString(temp[1], item.Name);
                if (!!data && !!schema) {
                    window[item.Name + 'Data'] = data;
                    window[item.Name + 'Schema'] = schema;
                }
                VueEventListener.fire("toggleLoading");
            }).catch((error) => {
                VueEventListener.fire('error', error);
            });
        },
        getDataString(string, name) {
            const offset = "window['" + name + "Data'] = ",
                start = string.indexOf(offset),
                end = string.indexOf(';\n'),
                dataString = string.substring(start + offset.length, end),
                schemaString = string.substring(end + 1, string.length);
            try {
                return [JSON.parse(dataString), schemaString];
            } catch (e) {
                console.log(e);
                VueEventListener.fire('error', "Error while parsing data JSON");
            }
        },
        getSchemaString(string, name) {
            const offset = "window['" + name + "Schema'] = ",
                start = string.indexOf(offset),
                end = string.indexOf(';'),
                schemaString = string.substring(start + offset.length, end);
            try {
                return JSON.parse(schemaString);
            } catch (e) {
                VueEventListener.fire('error', "Error while parsing schema JSON");
            }

        }
    }
}