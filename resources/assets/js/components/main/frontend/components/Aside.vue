<template>
    <aside class="aside-menu">
        <div class="card">
            <div class="card-header">
                <h3>Synchronization</h3>
            </div>
            <div class="card-body d-flex flex-column">
                <label for="hash">
                    Data Folder Hash
                </label>
                <div class="input-group mb-3 mt-1">
                    <input type="text" id="hash" class="form-control" v-model="hash">
                </div>
                <button type="button" class="btn btn-primary" @click.prevent.stop='syncData' :disabled="!!loading">
                    Get Sync Info
                </button>
                <vue-loading type="bars" color="#57BAC6" :size="{ width: '50px', height: '50px' }"
                             v-show="!!loading"></vue-loading>
                <div class="info-wrapper mt-auto" v-show="!!outdated.timestamp">
                    <p class="text-warning mb-1"><strong>{{outdatedRemote}}</strong> Remote Folders differ</p>
                    <p class="text-warning mb-1"><strong>{{outdatedLocal}}</strong> Local Folders differ</p>
                    <p class="text-warning"><strong>{{outdatedFiles}}</strong> Data Files differ</p>
                    <p class="text-info">Checked on <strong>{{outdatedTimestamp}}</strong></p>
                    <router-link class="btn btn-secondary" :to="{name: 'Sync', params: {outdated: outdated}}"
                                 @click.native="toggleAside">
                        View more info
                    </router-link>
                </div>
            </div>
        </div>
    </aside>
</template>

<script>
    import TextFilters from '../../../filters/textFilters';
    import vueLoading from 'vue-loading-template';

    export default {
        name: 'custom-aside',
        mixins: [TextFilters],
        components: {
            vueLoading
        },
        data() {
            return {
                hash: 'QmaVEzmwBbmahoQ5jT8RmCSzhiyzanPnpB5W5oULcUtgZH',
                outdated: {
                    remote: [],
                    local: [],
                    files: [],
                    timestamp: undefined
                },
                loading: undefined
            }
        },
        methods: {
            validateHash() {
                const sanitizeString = this.$options.filters.sanitizeString;
                this.hash = sanitizeString(this.hash);
            },
            syncData() {
                this.loading = true;
                this.validateHash();
                if (!this.hash) {
                    this.loading = false;
                    VueEventListener.fire('error', "Invalid Hash");
                    return;
                }

                axios.post('http://localhost:8000/sync', {
                    hash: this.hash
                }).then((result) => {
                    const data = result.data;
                    this.outdated.remote = data[0];
                    this.outdated.local = data[1];
                    this.outdated.files = data[2];
                    this.outdated.timestamp = moment();
                    this.loading = false;
                }).catch((error) => {
                    console.log(error);
                })
            },
            toggleAside() {
                document.body.classList.toggle('aside-menu-hidden');
            }
        },
        computed: {
            outdatedRemote() {
                return this.outdated.remote.length;
            },
            outdatedLocal() {
                return this.outdated.local.length;
            },
            outdatedFiles() {
                return this.outdated.files.length;
            },
            outdatedTimestamp() {
                return (!!this.outdated.timestamp) ? this.outdated.timestamp.format("dddd, MMMM Do YYYY, HH:mm:ss") : '';
            }
        }
    }
</script>

<style lang="scss">
    .aside-menu {
        .card {
            height: 93%;
        }
    }
</style>
