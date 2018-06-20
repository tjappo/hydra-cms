<template>
    <div class="card">
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
                <div class="item-wrapper mb-3 border p-2" v-for="(item, key) in files">
                    <h6 class="text-center">{{item.Name}}</h6>
                    <b-progress :max="2" class="mb-3">
                        <b-progress-bar variant="primary" :value="1"></b-progress-bar>
                        <b-progress-bar variant="success" :value="1"></b-progress-bar>
                    </b-progress>
                    <div class="d-flex justify-content-between">
                        <b-btn variant="primary" :id="'filesPullButton' + key">Pull</b-btn>
                        <b-popover :target="'filesPullButton' + key"
                                   title="Confirm Pull"
                                   triggers="focus blur">
                            <p>Are you sure you want to overwrite the local file?</p>
                            <button class="btn btn-xs btn-primary" @click.prevent.stop="pullData(item, key)">Yes
                            </button>
                            <button class="btn btn-xs btn-danger" @click.prevent.stop="closePopover('Pull', key)">No
                            </button>
                        </b-popover>
                        <b-btn variant="secondary">View differences</b-btn>
                        <b-btn variant="success" class="float-right" :id="'filesPushButton' + key">Push</b-btn>
                        <b-popover :target="'filesPushButton' + key"
                                   title="Confirm Push"
                                   triggers="focus blur">
                            <p>Are you sure you want to overwrite the remote file?</p>
                            <button class="btn btn-xs btn-primary" @click.prevent.stop="pushData(item, key)">Yes
                            </button>
                            <button class="btn btn-xs btn-danger" @click.prevent.stop="closePopover('Push', key)">No
                            </button>
                        </b-popover>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import pullFile from './functions/pullData';
    import pushFile from './functions/pushData';

    export default {
        name: 'FilesSync',
        mixins: [pullFile, pushFile],
        props: {
            'files': [Array]
        },
        methods: {
            closePopover(action, key) {
                this.$root.$emit('bv::hide::popover', 'files' + action + 'Button' + key);
            },
            pushData(item, key) {
                this.closePopover('Push', key);
                VueEventListener.fire('toggleLoading');
                this.pushFile(item);
                this.files.splice(key, 1);
            },
            pullData(item, key) {
                this.closePopover('Pull', key);
                VueEventListener.fire('toggleLoading');
                this.pullFile(item);
                this.files.splice(key, 1);
            }
        }
    }
</script>
