<template>
    <div class="card">
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
                <div class="item-wrapper mb-3 border p-2" v-for="(item, key) in local">
                    <h6 class="text-center">{{item}}</h6>
                    <b-progress :max="2" class="mb-3">
                        <b-progress-bar variant="secondary" :value="1" class="transparent"></b-progress-bar>
                        <b-progress-bar variant="success" :value="1"></b-progress-bar>
                    </b-progress>
                    <b-btn variant="primary" disabled>Pull</b-btn>
                    <b-btn variant="success" class="float-right" :id="'localPushButton' + key">Push</b-btn>
                    <b-popover :target="'localPushButton' + key"
                               title="Confirm Push"
                               triggers="focus blur">
                        <p>Are you sure about pushing the local <code>{{item}}</code> folder and, if contained within
                            this folder, all files?</p>
                        <button class="btn btn-xs btn-primary" @click.prevent.stop="pushData(item, key)">Yes</button>
                        <button class="btn btn-xs btn-danger" @click.prevent.stop="closePopover(key)">No</button>
                    </b-popover>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import pushFile from './functions/pushData';

    export default {
        name: 'LocalSync',
        mixins: [pushFile],
        props: {
            'local': [Array],
            'syncInfo': [Object]
        },
        methods: {
            closePopover(key) {
                this.$root.$emit('bv::hide::popover', 'localPushButton' + key);
            },
            pushData(item, key) {
                this.closePopover(key);
                VueEventListener.fire('toggleLoading');

                this.pushFile(this.syncInfo, item);
                this.local.splice(key, 1);
                // axios.post('http://localhost:8000/local/pushFolder', {
                //     item: item,
                //     syncInfo: this.syncInfo
                // }).then(
                //     () => {
                //         VueEventListener.fire('toggleLoading');
                //         VueEventListener.fire('success', "Folder Pushed");
                //         // this.local.splice(key, 1);
                //     }
                // ).catch(
                //     (error) => {
                //         VueEventListener.fire('toggleLoading');
                //         VueEventListener.fire(
                //             'An unexpected error has occurred: ',
                //             (!!error.response) ? error.response.data : '')
                //     }
                // );
            }
        }
    }
</script>