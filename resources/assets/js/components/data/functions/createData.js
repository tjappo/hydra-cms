import hash from "object-hash";
import config from "../../../../../../config.mjs";

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
                }
            }
            return true;
        },
        processImages(newData, name) {
            for (let key of Object.keys(newData)) {
                if (this.schema.properties[key].media && this.schema.properties[key].media.binaryEncoding === "base64") {
                    const data = newData[key].split(';base64,'),
                        extension = data[0].split('/').pop(),
                        imageData = data.pop(),
                        path = 'img/' + name.substring(0, name.length - 4),
                        fileName = hash(newData) + '.' + extension;
                    this.processImage(imageData, path, fileName, name, newData, tempKey);
                }
            }
        },
        processImage(imageData, path, fileName, varName, newData, tempKey) {
            return new Promise((resolve, reject) => {
                if (!!imageData) {
                    const imageDirectory = config.exportPath + path;
                    createDirectory(imageDirectory,
                        fs.writeFile(imageDirectory + '/' + fileName, new Buffer(imageData, "base64"), (err) => {
                            if (err) reject(new Error("Image upload error, at: " + path + "; " + err));

                            newData[tempKey] = path + '/' + fileName;
                            resolve(newData);
                        }));
                } else {
                    newData[tempKey] = "";
                    resolve(newData);
                }
            });
        }
    },
    computed: {
        schema() {
            return window[name + 'Schema'];
        }
    }

}