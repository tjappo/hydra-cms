<template>
    <aside class="aside-menu">
        <div class="card h-100">
            <div class="card-header">
                <h3>Synchronization</h3>
            </div>
            <div class="card-body">
                <label for="merkle-hash">
                    Data Folder Hash
                </label>
                <div class="input-group mb-3 mt-1">
                    <input type="text" id="merkle-hash" class="form-control" v-model="hash">
                </div>
                <button type="button" class="btn btn-primary" @click.prevent.stop='syncData'>Get Sync Info</button>
            </div>
        </div>
    </aside>
</template>

<script>
    import TextFilters from '../../../filters/textFilters';

    export default {
        name: 'custom-aside',
        mixins: [TextFilters],
        data() {
            return {
                hash: 'QmaVEzmwBbmahoQ5jT8RmCSzhiyzanPnpB5W5oULcUtgZH'
            }
        },
        methods: {
            validateHash() {
                const sanitizeString = this.$options.filters.sanitizeString;
                this.hash = sanitizeString(this.hash);
            },
            syncData() {
                this.validateHash();
                if (!this.hash) {
                    VueEventListener.fire('error', "Invalid Hash");
                    return;
                }

                axios.post('http://localhost:8000/sync', {
                    hash: this.hash
                }).then((result) => {
                    console.log(result.data);
                }).catch((error) => {
                    console.log(error);
                })
            }
        }
    }
</script>
