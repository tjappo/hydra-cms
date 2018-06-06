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
    import AdminMixin from '../main/frontend/functions';
    import TextFilter from '../filters/textFilters';
    import pushData from '../sync/functions/pushData';
    import processData from './functions/processData';

    export default {
        mixins: [AdminMixin, TextFilter, pushData, processData],
        methods: {
            submitForm() {
                VueEventListener.fire('toggleLoading');
                const values = this.editor.getValue();

                if (!this.validateContent(values, this.title)) {
                    VueEventListener.fire('toggleLoading');
                    return;
                }

                let newData = this.setData(this.schema.properties, values, undefined);
                newData = Object.assign({"id": this.data.length + 1}, newData);

                this.data.push(newData);
                window[this.title + 'Data'] = this.data;

                this.pushFile(this.syncInfo, this.title);
            },
        },
        created() {
            const that = this;
            // Specify upload handler
            JSONEditor.defaults.options.upload = function (type, file, cbs) {
                VueEventListener.fire('toggleLoading');
                if (!that.validateSyncInfo(that.syncInfo)) {
                    VueEventListener.fire('toggleLoading');
                    return;
                }
                that.syncInfo.path += '/img/' + that.title;
                that.pushImage(that.syncInfo, file, (error) => {
                    if (!!error) cbs.failure('Upload failed: ' + error);
                    cbs.updateProgress(100);
                    cbs.success('/' + that.syncInfo.path + '/' + file.name);
                });
            };
        },
        mounted() {
            this.loadData();
        },
        computed: {
            title() {
                return (this.schema) ? this.schema.title.substring(0, this.schema.title.length - 4) : '';
            },
            syncInfo() {
                return this.$store.getters.syncInfo;
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