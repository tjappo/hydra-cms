const data = "window['testData'] = [];\n";

const schema = `
window['testSchema'] = {
    "title": "testData",
    "url": "test/data.json.js",
    "type": "object",
    "properties": {
        "string": {
            "type": "object",
            "properties": {
                "en": {
                    "type": "string",
                    "description": "",
                    "default": ""
                }
            },
            "required": false
        },
        "number": {
            "type": "number",
            "description": "",
            "default": "",
            "required": false
        },
        "date": {
            "type": "string",
            "description": "",
            "required": false,
            "format": "date"
        },
        "boolean": {
            "type": "boolean",
            "description": "",
            "default": false,
            "required": false,
            "format": "checkbox"
        },
        "media upload": {
            "type": "string",
            "description": "",
            "required": false,
            "media": {
                "binaryEncoding": "base64"
            }
        },
        "html": {
            "type": "object",
            "properties": {
                "en": {
                    "type": "string",
                    "description": "",
                    "default": "",
                    "format": "html",
                    "options": {
                        "wysiwyg": true
                    }
                }
            },
            "required": false
        }
    }
};`;

export {data, schema};