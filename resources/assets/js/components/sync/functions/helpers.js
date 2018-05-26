export default {
    methods: {
        constructFile(item) {
            const data = window[(item.Name || item) + 'Data'],
                schema = window[(item.Name || item) + 'Schema'];

            if (!data || !schema) return;

            const dataToPush = "window['" + (item.Name || item) + "Data'] = " + JSON.stringify(data, null, "\t") + ';',
                schemaToPush = "window['" + (item.Name || item) + "Schema'] = " + JSON.stringify(schema, null, "\t") + ';',
                offset = "\n\n// IMPORTANT:\n" +
                    "//  title has to be the same as the name of the data variable\n" +
                    "//  Url to this file relatively to the root folder\n";

            return dataToPush + offset + schemaToPush;
        },
    }
}