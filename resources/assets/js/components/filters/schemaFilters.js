module.exports = {
    data() {
        return {
            data: {
                'title': "",
                items: []
            },
            types: {
                "string": "String",
                "number": "Number",
                "boolean": "Boolean",
                "media": "Media upload",
                "html": "HTML"
            }
        }
    },
    methods: {
        validateForm() {
            const sanitized = this.validateString(this.data.title);
            if (!sanitized) {
                VueEventListener.fire('error', "Title is not valid: " + this.data.title);
                return false;
            }

            this.data.title = sanitized.toString();

            for (let item of this.data.items) {
                item.default = (item.type === 'html') ? item.default : this.validateString(item.default);
                item.description = this.validateString(item.description);
                item.required = (!!item.required);
                item.name = this.validateString(item.name);
                if (!this.checkUniqueName(item.name)) return false;
                item.type = this.validateString(item.type);
                if (item.type in Object.keys(this.types)) {
                    VueEventListener.fire('error', "Type is not valid: " + item.type);
                    return false;
                }
            }

            return true;
        },
        addColumn(name, type, description, defaultVal, requiredVal) {
            this.data.items.push({
                name: name || "",
                type: type || "",
                description: description || "",
                default: defaultVal || "",
                required: requiredVal || false
            });
        },
        removeRow(index) {
            this.data.items.splice(index, 1);
        },
        validateString(str) {
            const sanitized = this.$options.filters.sanitizeString(str);
            return (!!sanitized && typeof str === 'string') ? sanitized : '';
        },
        checkUniqueName(str) {
            if (this.data.items.filter((item) => item.name === str).length > 1) {
                VueEventListener.fire('error', "Name is not unique: " + str);
                return false;
            }
            return true;
        },
    },
    computed: {
        itemsExists() {
            return !!this.data.items && this.data.items.length > 0;
        }
    }
};