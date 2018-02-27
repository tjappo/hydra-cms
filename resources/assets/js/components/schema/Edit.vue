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
                        Edit schema: <strong>{{data.title}}</strong>
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
                                        <input type="text" class="form-control" placeholder="Name" v-model="item.name"
                                               required>
                                    </td>
                                    <td>
                                        <select class="form-control" required v-model="item.type">
                                            <option v-for="(value, key) in types" :value="key"
                                                    :selected="value === item.type">{{value}}
                                            </option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" placeholder="Description"
                                               v-model="item.description">
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" placeholder="Default value"
                                               v-model="item.default">
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
    import SchemaFilter from '../filters/schemaFilters';

    export default {
        mixins: [TextFilter, SchemaFilter],
        props: {
            'name': [String]
        },
        methods: {
            validateName() {
                if (!window[this.name + 'Data'] && !window[this.name + 'Schema']) {
                    VueEventListener.fire('error', 'Given name could not be verified: ' + this.name);
                    this.$router.push('/');
                }
            },
            prepareData() {
                const properties = window[this.name + 'Schema'].properties;
                for (let item in properties) {
                    console.log(properties[item].default);
                    this.data.items.push({
                        name: item || "",
                        type: properties[item].type || "",
                        description: properties[item].description || "",
                        default: properties[item].default || "",
                        required: properties[item].required || false
                    });
                }
            }
        },
        mounted() {
            this.validateName();
            this.prepareData();
        },
        watch: {
            '$route.params.name'() {
                this.validateName();
            }
        }
    }
</script>