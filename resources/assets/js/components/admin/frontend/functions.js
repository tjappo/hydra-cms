module.exports = {
	props: {
		'name': String,
	},
	data() {
		return {
			data: undefined,
			schema: undefined,
			editor: undefined,
		}
	},
	methods: {
		initializeJsonEditor() {
			this.editor = new JSONEditor(document.getElementById("jsoneditor-wrapper"), {
				//...
				theme: 'bootstrap4',
				schema: this.schema,
				disable_properties: true,
				disable_edit_json: true,
				custom_validators: [
					(schema, value, path) => {
						let errors = [];
						if (schema.format === "date") {
							if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value)) {
								// Errors must be an object with `path`, `property`, and `message`
								errors.push({
									path: path,
									property: 'format',
									message: 'Dates must be in the format "YYYY-MM-DD"'
								});
							} else if (new Date(value) < new Date()) {
								errors.push({
									path: path,
									property: 'format',
									message: 'Dates should not be before today'
								});
							}
						}
						return errors;
					}
				]
			});
			this.validateEditor();
		},
		validateEditor() {
			// Hook up the validation indicator to update its
			// status whenever the editor changes
			this.editor.on('change', () => {
				// Get an array of errors from the validator
				let errors = this.editor.validate();

				let indicator = document.getElementById('valid_indicator');

				// Not valid
				if (errors.length) {
					indicator.style.color = 'red';
					indicator.textContent = "not valid";
				}
				// Valid
				else {
					indicator.style.color = 'green';
					indicator.textContent = "valid";
				}
			});
		},
		loadData(callback) {
			const data = this.name + 'Data';
			const schema = this.name + 'Schema';

			if (!window[data] || !window[schema]) {
				VueEventListener.fire('error', 'Data could not be retrieved from: ' + this.name);
				this.$router.push('/');
			}

			this.data = window[data];
			this.schema = window[schema];

			this.initializeJsonEditor();
			typeof callback === 'function' && callback();
		},
	},
	computed: {
		hasErrors() {
			return (this.editor) ? this.editor.validate().length > 0 : true;
		}
	},
	destroyed() {
		this.editor = undefined;
	},
};