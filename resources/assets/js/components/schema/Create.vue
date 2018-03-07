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
                        Create new schema: <strong>{{data.title | lowerCase}}</strong>
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
                                                    :selected="value === 'string'">{{value}}
                                            </option>
                                        </select>
                                    </td>
                                    <td>
                                        <input type="text" class="form-control" placeholder="Description"
                                               v-model="item.description">
                                    </td>
                                    <td>
                                        <input :type="checkType(item.type)" class="form-control"
                                               placeholder="Default value" v-model="item.default">
                                    </td>
                                    <td>
                                        <div class="switch-wrapper">
                                            <input :id="'required-' + index" type="checkbox" class="switch-checkbox"
                                                   v-model="item.required">
                                            <label class="switch-label" :for="'required-' + index">required</label>
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
    import SchemaFilter from './components/schemaFilters';

    export default {
        mixins: [TextFilter, SchemaFilter],
        methods: {
            submitForm() {
                if (!this.validateForm()) return;

                axios.post('http://localhost:8000/schema/create', {
                    title: this.data.title,
                    items: this.data.items
                }).then(
                    () => {
                        VueEventListener.fire('success', "Schema Created");
                        setTimeout(function () {
                            window.location.reload(1);
                        }, 5000);
                        this.$router.push({
                            name: 'Index'
                        });
                    }
                ).catch(
                    (error) => VueEventListener.fire(
                        'An unexpected error has occured: ',
                        (!!error.response) ? error.response.data : '')
                );
            },
        }
    }
</script>