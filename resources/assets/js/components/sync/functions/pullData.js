import config from "../../../../../../config.mjs";

export default {
    methods: {
        pullFile(syncInfo, item) {
            const olddata = window[item.Name + 'Data'];
            const oldschema = window[item.Name + 'Schema'];

            axios.get(config.getIPFSFile, {
                params: {
                    hash: syncInfo.hash,
                    path: syncInfo.path + '/' + item.Name + '/data.json.js',
                }
            }).then((result) => {
                const data = this.getDataString(result.data.response, item.Name),
                    schema = this.getSchemaString(result.data.response, item.Name);
                if (!!data && !!schema) {
                    window[item.Name + 'Data'] = data;
                    window[item.Name + 'Schema'] = schema;
                    console.log(data === olddata);
                    console.log(schema === oldschema);
                }
            }).catch((error) => {
                VueEventListener.fire('error', error);
            });
        },
        getDataString(string, name) {
            const offset = "window['" + name + "Data'] = ",
                start = string.indexOf(offset),
                end = string.indexOf(';\n'),
                dataString = string.substring(start + offset.length, end);
            try {
                return JSON.parse(dataString);
            } catch (e) {
                console.log(e);
                VueEventListener.fire('error', "Error while parsing JSON");
            }
        },
        getSchemaString(string, name) {
            const offset = "\n\nwindow['" + name + "Schema'] = ",
                start = string.indexOf(offset),
                end = string.indexOf(';\n'),
                schemaString = string.substring(start + offset.length, end);
            try {
                console.log(schemaString);
                return JSON.parse(schemaString);
            } catch (e) {
                console.log(e);
                VueEventListener.fire('error', "Error while parsing JSON");
            }

        }
    }
}