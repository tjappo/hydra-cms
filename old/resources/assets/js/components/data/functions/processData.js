export default {
    methods: {
        validateContent(newData, name) {
            if (!this.schema) {
                VueEventListener.fire('error', "Schema does not exist: " + name + 'Schema');
                return false;
            }

            for (let key of Object.keys(newData)) {
                if (typeof newData[key] !== this.schema.properties[key].type &&
                    (this.schema.properties[key] === 'integer' && typeof newData[key] !== 'number')) {
                    VueEventListener.fire('error', "Type mismatch error, expected: " + this.schema.properties[key].type + ", but got: " + typeof newData[key]);
                    return false;
                } else if (!!this.schema.properties[key].required && !newData[key]) {
                    VueEventListener.fire('error', "'" + key + "' is required.");
                    return false;
                }
            }
            return true;
        },
        setData(keys, values, oldData) {
            let toPush = {};
            Object.keys(keys).forEach((key) => {
                if (key in values) {
                    toPush[key] = values[key];
                } else {
                    toPush[key] = (!!oldData) ? oldData[key] : null;
                }
            });
            return toPush
        },
        constructDataFile(data, schema, name) {
            const offset = "window['" + name + "Data'] = ",
                schemaOffset = "\n\nwindow['" + name + "Schema'] = ";
            return offset + JSON.stringify(data, null, "\t") + ';' + schemaOffset + JSON.stringify(schema, null, "\t") + ';';
        }
    }
}