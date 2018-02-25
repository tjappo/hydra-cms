<template>
    <div class="container wrapper">
        <vue-headful
                :title="metaTitle ||'Shift - Decentralize the web'"
                :description="metaDescription || 'Page meta description'"
        />
        <div class="row justify-content-center">
            <div class="col">
                <div class="card w-100">
                    <div class="card-header">
                        Create new schema: <strong>{{data.title}}</strong>
                    </div>
                    <form>
                        <div class="card-body">
                            <div class="form-group">
                                <label for="title">Title</label>
                                <input id="title" type="text" class="form-control" v-model="data.title" required>
                            </div>
                            <table class="table" v-if="itemsExists">
                                <thead>
                                <tr>
                                    <td><strong>Name</strong></td>
                                    <td><strong>Type</strong></td>
                                    <td><strong>Description</strong></td>
                                    <td><strong>Default value</strong></td>
                                    <td><strong>Required</strong></td>
                                    <td></td>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item, index) in data.items">
                                    <td>
                                        <input type="text" class="form-control" placeholder="Name" v-model="item.name" required>
                                    </td>
                                    <td>
                                        <select class="form-control" required v-model="item.type">
                                            <option v-for="(value, key) in types" :value="key">{{value}}</option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" placeholder="Description"
                                               v-model="item.description">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" placeholder="Default value">
                                    </td>
                                    <td>
                                        <div class="switch-wrapper">
                                            <input :id="'required-' + item.name" type="checkbox" class="switch-checkbox"
                                                   v-model="item.required">
                                            <label class="switch-label" :for="'required-' + item.name">required</label>
                                        </div>
                                    </td>
                                    <td>
                                        <i class="popover-button fas fa-trash-alt" aria-hidden="true"
                                           @click="removeRow(index)"></i>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <button type="button" class="btn btn-success" @click="addColumn()">Add new column</button>
                        </div>
                        <div class="card-footer">
                            <input type="submit" class="btn btn-primary" @click.prevent="submitForm" value="Submit">
                            <b-link class="btn btn-secondary float-right" :to="{name: 'Index'}">Cancel</b-link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TextFilter from '../filters/textFilters.js';

    export default {
        mixins: [TextFilter],
        data() {
            return {
                data: {
                    'title': "",
                    items: []
                },
                types: {
                    "string": "String",
                    "integer": "Number",
                    "boolean": "Boolean",
                    "upload": "Media upload",
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

                this.data.title = sanitized;

                for (let item of this.data.items) {
                    item.default = this.validateString(item.default);
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
            submitForm() {
                if (!this.validateForm()) return;

                axios.post('http://localhost:8000/schema/create', {
                    title: this.data.title,
                    items: this.data.items
                }).then(
                    (response) => {
                        VueEventListener.fire('success', "Schema created");
                        // window[this.schema.title] = response.data;
                        // this.$router.push({
                        //     name: 'AdminIndex',
                        //     params: {
                        //         'name': this.name
                        //     }
                        // });
                    }
                ).catch(
                    (error) => VueEventListener.fire('error', error.response.data)
                );
            },
            addColumn() {
                this.data.items.push({
                    name: "",
                    type: "",
                    description: "",
                    default: "",
                    required: false
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
    }
</script>