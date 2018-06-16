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
                        <b-link class="btn btn-secondary float-right" :to="{name: 'Index'}">Cancel</b-link>
                        <span id='valid_indicator' class="mt-1 mr-3 float-right"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
	import AdminMixin from '../main/frontend/functions';
	import TextFilter from '../filters/textFilters.js';
    import pushData from '../sync/functions/pushData';
    import processData from './functions/processData';

	export default {
		mixins: [AdminMixin, TextFilter, pushData, processData],
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
                VueEventListener.fire('toggleLoading');
				const values = this.editor.getValue();

                if (!this.validateContent(values, this.title)) {
                    VueEventListener.fire('toggleLoading');
                    return;
                }

                const dataName = this.title + 'Data';
                const index = this.data.findIndex(x => x.id === this.oldData.id);
                this.data[index] = this.setData(this.schema.properties, values, this.oldData);
                this.data[index] = Object.assign({"id": this.oldData.id}, window[dataName][index]);

                window[this.title + 'Data'] = this.data;

                this.pushFile(this.title);
                VueEventListener.fire('success', "Data Edited");
                this.$router.push({
                    name: 'AdminIndex',
                    params: {
                        'name': this.title
                    }
                });
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
                this.editor.validate()
			}
		},
        created() {
		    this.initialiseImageUploadHandler();
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