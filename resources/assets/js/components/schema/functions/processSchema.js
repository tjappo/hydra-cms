import getSchemaObject from './schemaFactory.js';

export default {
    methods: {
        initialiseSchema(title, items) {
            const schemaValues = this.getSchema(items);
            if (!schemaValues) return;

            const dataName = title + "Data",
                url = title + "/data.json.js",
                schema = {
                    "title": title + 'Data',
                    "url": url,
                    "type": "object",
                    "properties": schemaValues
                };

            return schema;
        },
        getSchema(items, res) {
            let result = {};
            for (let item of items) {
                let temp = getSchemaObject(item, res);
                if (!temp) return;
                result[item.name] = temp;
            }
            return result;
        }
    }
}