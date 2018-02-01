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
                        Create new schema: <strong>{{test.title}}</strong>
                    </div>
                    <div class="card-body">
                        <div class="form-group">
                            <label for="title">Title</label>
                            <input id="title" type="text" class="form-control" v-model="test.title">
                        </div>

                    </div>
                    <div class="card-footer">
                        <button type="submit" class="btn btn-primary" @click="submitForm">Submit
                        </button>
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
                test: {
		            'title': ""
                }
            }
        },
		methods: {
			scrollEvent() {
				$(".wrapper").get(0).scrollIntoView({behavior: 'smooth'});
			},
			submitForm() {

			},
		},
		mounted() {
			this.scrollEvent();
		},
		computed: {

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