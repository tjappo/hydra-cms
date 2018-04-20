<template>
    <div class="container wrapper">
        <vue-headful
                :title="metaTitle ||'Shift - Decentralize the web'"
                :description="metaDescription || 'Page meta description'"
        />
        <div class="row justify-content-center">
            <div class="col" id="accordion">
                <div class="card" v-if="!!checkArray(outdated.remote)">
                    <div class="card-header" id="remoteHeading">
                        <h5 class="mb-0">
                            <button class="btn btn-link" data-toggle="collapse" data-target="#remote-content"
                                    aria-expanded="true" aria-controls="remote-content">
                                Remote Data
                            </button>
                        </h5>
                    </div>

                    <div id="remote-content" class="collapse show" aria-labelledby="remoteHeading"
                         data-parent="#accordion">
                        <div class="card-body">
                            <div class="row mb-3">
                                <div class="col"><strong>Remote newer</strong></div>
                                <div class="col text-center"><strong>Up-to-date</strong></div>
                                <div class="col text-right"><strong>Local newer</strong></div>
                            </div>
                            <div class="item-wrapper mb-3 border p-2" v-for="item in outdated.remote">
                                <h6 class="text-center">{{item}}</h6>
                                <b-progress :max="2" class="mb-3">
                                    <b-progress-bar variant="primary" :value="1"></b-progress-bar>
                                    <b-progress-bar variant="success" :value="0"></b-progress-bar>
                                </b-progress>
                                <button class="btn btn-primary">Pull</button>
                                <button class="btn btn-success float-right">Push</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card" v-if="!!checkArray(outdated.local)">
                    <div class="card-header" id="localHeading">
                        <h5 class="mb-0">
                            <button class="btn btn-link" data-toggle="collapse" data-target="#local-content"
                                    aria-expanded="true" aria-controls="local-content">
                                Local Data
                            </button>
                        </h5>
                    </div>

                    <div id="local-content" class="collapse show" aria-labelledby="localHeading"
                         data-parent="#accordion">
                        <div class="card-body">
                            <div class="row mb-3">
                                <div class="col"><strong>Remote newer</strong></div>
                                <div class="col text-center"><strong>Up-to-date</strong></div>
                                <div class="col text-right"><strong>Local newer</strong></div>
                            </div>
                            <div class="item-wrapper mb-3 border p-2" v-for="item in outdated.local">
                                <h6 class="text-center">{{item}}</h6>
                                <b-progress :max="2" class="mb-3">
                                    <b-progress-bar variant="primary" :value="1"></b-progress-bar>
                                    <b-progress-bar variant="success" :value="0"></b-progress-bar>
                                </b-progress>
                                <button class="btn btn-primary">Pull</button>
                                <button class="btn btn-success float-right">Push</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card" v-if="!!checkArray(outdated.files)">
                    <div class="card-header" id="filesHeading">
                        <h5 class="mb-0">
                            <button class="btn btn-link" data-toggle="collapse" data-target="#files-content"
                                    aria-expanded="true" aria-controls="files-content">
                                Files
                            </button>
                        </h5>
                    </div>

                    <div id="files-content" class="collapse show" aria-labelledby="filesHeading"
                         data-parent="#accordion">
                        <div class="card-body">
                            <div class="row mb-3">
                                <div class="col"><strong>Remote newer</strong></div>
                                <div class="col text-center"><strong>Up-to-date</strong></div>
                                <div class="col text-right"><strong>Local newer</strong></div>
                            </div>
                            <div class="item-wrapper mb-3 border p-2" v-for="item in outdated.files">
                                <h6 class="text-center">{{item.Name}}</h6>
                                <b-progress :max="2" class="mb-3">
                                    <b-progress-bar variant="primary" :value="1"></b-progress-bar>
                                    <b-progress-bar variant="success" :value="1"></b-progress-bar>
                                </b-progress>
                                <div class="d-flex justify-content-between">
                                    <button class="btn btn-primary">Pull</button>
                                    <button class="btn btn-secondary">View difference</button>
                                    <button class="btn btn-success">Push</button>
                                </div>
                            </div>
                        </div>
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
        props: {
            'outdated': [Object]
        },
        methods: {
            submitForm() {
                //     if (!this.validateForm()) return;
                //
                //     axios.post('http://localhost:8000/schema/create', {
                //         title: this.data.title,
                //         items: this.data.items
                //     }).then(
                //         (response) => {
                //             VueEventListener.fire('success', "Schema Created");
                //             window[this.data.title + 'Data'] = [];
                //             window[this.data.title + 'Schema'] = response.data;
                //             VueEventListener.fire('addDataChild', this.data.title);
                //             this.$router.push({
                //                 name: 'Index'
                //             });
                //         }
                //     ).catch(
                //         (error) => VueEventListener.fire(
                //             'An unexpected error has occured: ',
                //             (!!error.response) ? error.response.data : '')
                //     );
            },
            checkArray(item) {
                return (!!item && item.length > 0);
            }
        },
        mounted() {
            if (!this.outdated) {
                this.$router.push({
                    name: 'Index'
                });
            }
        }
    }
</script>