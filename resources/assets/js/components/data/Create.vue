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
                        Add item to <strong>{{title | capitalize}}</strong> page
                    </div>
                    <div class="card-body">
                        <div id="jsoneditor-wrapper"></div>
                    </div>
                    <div class="card-footer">
                        <button type="submit" class="btn btn-primary" @click="submitForm" :disabled="hasErrors">Submit
                        </button>
                        <b-link class="btn btn-secondary float-right" :to="{name: 'Index'}">Cancel</b-link>
                        <span id='valid_indicator' class="mt-1 mr-3 float-right"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import AdminMixin from '../admin/frontend/functions';
	import TextFilter from '../filters/textFilters.js';

	export default {
		mixins: [AdminMixin, TextFilter],
		methods: {
			submitForm() {
				const values = this.editor.getValue();

				// WRITE TO FILE
				axios.post('http://localhost:8000/' + this.name + '/add', {
					data: values,
					varName: this.schema.title,
					url: this.schema.url
				}).then(
					(response) => {
						VueEventListener.fire('success', "Object created");
						window[this.schema.title] = response.data;
						this.$router.push({
							name: 'AdminIndex',
							params: {
								'name': this.name
							}
						});
					}
				).catch(
					(error) => VueEventListener.fire('error', error.response.data)
				);
			},
		},
		mounted() {
			this.loadData();
		},
		computed: {
			title() {
				return (this.schema) ? this.schema.title.substring(0, this.schema.title.length - 4) : '';
			}
		},
		watch: {
			'$route.params.name'() {
				this.loadData();
			}
		}
	}
</script>

<style>
    .ck-editor__editable {
        min-height: 200px;
    }
</style>