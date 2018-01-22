const fs = require('fs');
const {join} = require('path');
const hash = require('object-hash');
const config = require('../../../../../../config');

tempVariables = {
	writing: [],
};

module.exports = {

	/**
	 * Creates the new object and persists it
	 * @param {string} url path to data file
	 * @param {string} varName name of data variable
	 * @param {string} newData new data to process
	 * @param res response object
	 */
	create(url, varName, newData, res) {
		module.exports.processFile(url, varName, newData, (content, newData, schema, callback) => {
			return module.exports.addContent(content, newData, varName, schema, callback);
		}, res);
	},

	/**
	 * Updates the object with the new data and persists it
	 * @param {string} oldData old data to process
	 * @param {string} url path to data file
	 * @param {string} varName name of data variable
	 * @param {string} newData new data to process
	 * @param res response object
	 */
	update(oldData, url, varName, newData, res) {
		module.exports.processFile(url, varName, newData, (content, newData, schema) => {
			return module.exports.updateContent(oldData, content, newData, varName, schema);
		}, res);
	},

	/**
	 * Deletes the object with the given id and persists it
	 * @param {string} url path to data file
	 * @param {string} varName name of data variable
	 * @param {string} id new data to process
	 * @param res response object
	 */
	delete(url, varName, id, res) {
		module.exports.processFile(url, varName, "", (content) => {
			return module.exports.deleteContent(id, content);
		}, res);
	},

	/**
	 * Checks the access to the given url
	 * Executes the callback function if it is accessible
	 * @param {string} url path to data file
	 * @param {function} callback callback function
	 */
	checkFile(url, callback) {
		fs.access(url, fs.constants.R_OK | fs.constants.W_OK, (err) => {
			if (err) {
				console.error('Error, no access: ' + err);
				return;
			}
			callback;
		});
	},

	/**
	 * Process the given file with the new data
	 * @param {string} url path to data file
	 * @param {string} varName name of data variable
	 * @param {string} newData new data to process
	 * @param {function} callback function, representing the action
	 * @param res response object
	 */
	processFile(url, varName, newData, callback, res) {
		url = config.dataPath + url;
		module.exports.checkFile(url, module.exports.extractDataString(url, varName,
			(err, offset, content, schema) => {
				content = callback(content, newData, schema, (content) => {
					module.exports.writeToFile(url, offset, content, schema);
				});
				res.status(200).send(content);
			}
		));
	},

	/**
	 * Splits the data into offset, content and schema
	 * @param {string} url path to data file
	 * @param {string} varName name of data variable
	 * @param {function} callback function
	 */
	extractDataString(url, varName, callback) {
		fs.readFile(url, (err, data) => {
			const offset = "window['" + varName + "'] = ",
				string = data.toString(),
				start = string.indexOf(offset),
				end = string.indexOf(';'),
				dataString = string.substring(start + offset.length, end),
				schema = string.substring(end + 1, string.length),
				content = JSON.parse(dataString);

			(err) ? callback(null, content) : callback(err, offset, content, schema); // Clean error handler
		});
	},

	/**
	 * Extracts the schema object from the string and converts it into a json object
	 * @param {string} schema schema of the json editor
	 * @param name name of the data object
	 */
	extractSchemaObject(schema, name) {
		const offset = "window['" + name + "Schema'] = ",
			string = schema.indexOf(offset);
		schema = schema.substring(string + offset.length, schema.length - 1);

		return JSON.parse(schema);
	},

	/**
	 * Writes the content to the file
	 * @param {string} url path to data file
	 * @param {string} offset content before the data starts
	 * @param {string} content data itself
	 * @param {string} schema schema of the json editor
	 */
	writeToFile(url, offset, content, schema) {
		const toWrite = offset + JSON.stringify(content, null, "\t") + ';' + schema;
		fs.writeFile(url, toWrite, (err) => {
			if (err) throw err;
		});
	},

	/**
	 * Validates the content of the given new data
	 * @param {Object} newData data to validate
	 * @param {string} varName name of data variable
	 * @param {string} schema schema of the json editor
	 * @returns {Object} validated new data
	 */
	validateContent(newData, varName, schema) {
		schema = module.exports.extractSchemaObject(schema, varName.substring(0, varName.length - 4));
		for (key of Object.keys(newData)) {
			if (typeof newData[key] !== schema.properties[key].type)
				throw new Error("Type mismatch error, expected: " + schema.properties[key].type + ", but got: " + newData[key]);
		}
		newData = module.exports.processImage(newData, varName, schema);
		return newData;
	},

	/**
	 * Process the image files of the given new data
	 * @param {Object} newData data to validate
	 * @param {string} varName name of data variable
	 * @param {string} schema schema of the json editor
	 * @returns {Object} processed new data
	 */
	processImage(newData, varName, schema) {
		for (key of Object.keys(newData)) {
			if (schema.properties[key].media && schema.properties[key].media.binaryEncoding === "base64") {
				tempVariables.writing.push(
					new Promise((resolve, reject) => {
						const data = newData[key].split(';base64,'),
							extension = data[0].split('/').pop(),
							imageData = data.pop(),	path = 'img/' + varName.substring(0, varName.length - 4),
							fileName = hash(newData) + '.' + extension,
							tempKey = key;
						fs.writeFile(config.dataPath + path + '/' + fileName, new Buffer(imageData, "base64"), (err) => {
							if (err) reject(new Error("Image upload error, at: " + varName));

							newData[tempKey] = path + '/' + fileName;
							resolve(newData);
						});
					})
				);
			}
		}
		return newData;
	},

	/**
	 * Adds new data to the old existing data
	 * @param {Object[]} content existing data
	 * @param {Object} newData data to add
	 * @param {string} varName name of data variable
	 * @param {string} schema schema of the json editor
	 * @returns {Object[]} new combined data
	 */
	addContent(content, newData, varName, schema, callback) {
		newData = module.exports.validateContent(newData, varName, schema);
		newData = Object.assign({"id": content.length + 1}, newData);
		Promise.all(tempVariables.writing).then((values) => {
			content.push(values[values.length - 1]);
			callback(content);
			return content;
		});
	},

	/**
	 * Edits the data with the new given data
	 * @param {Object} oldData old existing data
	 * @param {Object[]} content all of the data
	 * @param {Object} newData new edited data
	 * @param {string} varName name of data variable
	 * @param {string} schema schema of the json editor
	 * @returns {Object[]} new combined data
	 */
	updateContent(oldData, content, newData, varName, schema) {
		newData = module.exports.validateContent(newData, varName, schema);
		const index = content.findIndex(x => x.id === oldData.id);
		Object.keys(newData).forEach((key) => {
			content[index][key] = newData[key];
		});
		return content;
	},

	/**
	 * Deletes the data with the given id
	 * @param {string} id given id to delete
	 * @param {Object[]} content all of the data
	 * @returns {Object[]} new combined data
	 */
	deleteContent(id, content) {
		content = content.filter(function (item) {
			return item.id !== Number(id);
		});
		return content;
	},

	/**
	 * Gets all the directories within a given source
	 * @param source given source
	 */
	getDirectories(source) {
		const isDirectory = source => {
			return fs.lstatSync(source).isDirectory()
		};
		return fs.readdirSync(source).map(name => join(source, name)).filter(isDirectory).map(source => source.replace(config.dataPath, ''));
	},

};