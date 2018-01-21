const fs = require('fs');
const config = require('../../../../../../config');

module.exports = {

	/**
	 * Creates the new object and persists it
	 * @param {string} url path to data file
	 * @param {string} varName name of data variable
	 * @param {string} newData new data to process
	 * @param res response object
	 */
	create(url, varName, newData, res) {
		module.exports.processFile(url, varName, newData, (content, newData, schema) => {
			return module.exports.addContent(content, newData, varName, schema);
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
				content = callback(content, newData, schema, varName);
				module.exports.writeToFile(url, offset, content, schema);
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
	addContent(content, newData, varName, schema) {
		newData = module.exports.validateContent(newData, varName, schema);
		newData = Object.assign({"id": content.length + 1}, newData);
		content.push(newData);
		return content;
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
	}

};