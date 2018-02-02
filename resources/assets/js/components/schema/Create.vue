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
                    <div class="card-body">
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input id="title" type="text" class="form-control" v-model="data.title">
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
                                    <input type="text" class="form-control" placeholder="Name" v-model="item.name"
                                           required>
                                </td>
                                <td>
                                    <select class="form-control" required v-model="item.type">
                                        <option value="string">String</option>
                                        <option value="integer">Number</option>
                                        <option value="boolean">Boolean</option>
                                        <option value="upload">Media upload</option>
                                        <option value="html">HTML</option>
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
                                               v-model="item.hidden" required>
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
                        <button type="submit" class="btn btn-primary" @click="submitForm">Submit</button>
                        <span id='valid_indicator' class="float-right"></span>
                    </div>
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
				}
			}
		},
		methods: {
			submitForm() {

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