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
                                    <td><strong>Hidden</strong></td>
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
                                            <input :id="'hidden-' + item.name" type="checkbox" class="switch-checkbox"
                                                   v-model="item.hidden">
                                            <label class="switch-label" :for="'hidden-' + item.name">hidden</label>
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
                            <input type="submit" class="btn btn-primary" @click="submitForm" value="Submit"
                                   :disabled="validateForm()">
                            <span id='valid_indicator' class="float-right"></span>
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
                title: "",
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
                if (!!sanitized) return; // throw error: title not sanitized

                this.data.title = sanitized;

                for (let item of this.data.items) {
                    item.default = this.validateString(item.default);
                    item.description = this.validateString(item.description);
                    item.hidden = (!!item.hidden);
                    item.name = this.validateString(item.name);
                    item.type = this.validateString(item.type);
                    if (item.type in this.types) return;
                }

                return true;
            },
            submitForm() {
                this.validateForm();
                // submit
            },
            addColumn() {
                this.data.items.push({
                    name: "",
                    type: "",
                    description: "",
                    default: "",
                    hidden: false
                });
            },
            removeRow(index) {
                this.data.items.splice(index, 1);
            },
            validateString(str) {
                const sanitized = this.$options.filters.sanitizeString(str);
                return (!!sanitized && typeof str === 'string') ? sanitized : '';
            }
        },
        computed: {
            itemsExists() {
                return !!this.data.items && this.data.items.length > 0;
            }
        }
    }
</script>

<style>
    .ck-editor__editable {
        min-height: 200px;
    }
</style>