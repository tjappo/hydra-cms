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
                        Edit item of <strong>{{title | capitalize}}</strong> page
                    </div>
                    <div class="card-body">
                        <div id="jsoneditor-wrapper"></div>
                    </div>
                    <div class="card-footer">
                        <button type="submit" class="btn btn-primary" @click="submitForm" :disabled="hasErrors">Submit
                        </button>
                        <span id='valid_indicator' class="float-right"></span>
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
		props: {
			'id': [Number, String],
		},
		data() {
			return {
				oldData: undefined
			}
		},
		methods: {
			submitForm() {
				const values = this.editor.getValue();

				// WRITE TO FILE
				axios.put('http://localhost:8000/' + this.name + '/update', {
					oldData: this.oldData,
					data: values,
					varName: this.schema.title,
					url: this.schema.url
				}).then(
					(response) => {
						VueEventListener.fire('success', "Object updated");
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
			validateID() {
				const index = (typeof this.id === "number") ? this.id : Number(this.id);
				for (let item of this.data) {
					if (item.id === index) {
						this.oldData = item;
						this.prepareData(Object.assign({}, item));
						return;
					}
				}
				VueEventListener.fire('error', 'Given ID could not be verified: ' + this.id);
				this.$router.push('/');
			},
			prepareData(data) {
				Object.keys(data).forEach((key) => {
					if (!Object.keys(this.schema.properties).includes(key)) delete data[key];
				});
				this.editor.setValue(data);
			}
		},
		mounted() {
			this.loadData(this.validateID);
		},
		computed: {
			title() {
				return (this.schema) ? this.schema.title.substring(0, this.schema.title.length - 4) : '';
			}
		},
		watch: {
			'$route.params.id'() {
				this.validateID();
			},
			'$route.params.name'() {
				this.loadData(this.validateID);
			}
		}
	}
</script>

<style>
    .ck-editor__editable {
        min-height: 200px;
    }
</style>