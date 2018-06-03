<template>
    <div class="container wrapper">
        <vue-headful
                :title="metaTitle ||'Shift - Decentralize the web'"
                :description="metaDescription || 'Page meta description'"
        />
        <div class="row justify-content-center">
            <div class="col" id="accordion">
                <remote-sync v-if="checkArray(outdated.remote)" :remote="outdated.remote"></remote-sync>
                <local-sync v-if="checkArray(outdated.local)" :local="outdated.local"></local-sync>
                <files-sync v-if="checkArray(outdated.files)" :files="outdated.files"></files-sync>
            </div>
        </div>
        <loading-overlay></loading-overlay>
    </div>
</template>

<script>
    import TextFilter from '../filters/textFilters.js';
    import RemoteSync from "./Remote";
    import LocalSync from "./Local";
    import FilesSync from "./Files";
    import LoadingOverlay from "../main/frontend/components/LoadingOverlay";

    export default {
        components: {
            FilesSync,
            LocalSync,
            RemoteSync,
            LoadingOverlay
        },
        mixins: [TextFilter],
        props: {
            'outdated': [Object]
        },
        methods: {
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
        },
        computed: {
            syncInfo() {
                return this.$store.getters.syncInfo;
            }
        }
    }
</script>

<style lang="scss">
    .transparent {
        opacity: 0.5;
    }
</style>