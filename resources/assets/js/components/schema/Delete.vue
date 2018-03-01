<template>
    <div>
        <button class="btn btn-danger" id="schemaPopover" @click="popoverToggle">Delete Schema</button>
        <b-popover target="schemaPopover" :title="'Delete Schema: ' + title" :show.sync="showPopover">
            <p>Are you sure you want to delete this schema?</p>
            <button class="btn btn-xs btn-primary" @click.prevent.stop="deleteSchema">Yes</button>
            <button class="btn btn-xs btn-default" @click.prevent.stop="popoverToggle">No</button>
        </b-popover>
    </div>
</template>

<script>
    export default {
        name: 'DeleteSchema',
        props: {
            'title': [String]
        },
        data() {
            return {
                showPopover: false
            }
        },
        methods: {
            popoverToggle() {
                this.showPopover = !this.showPopover;
            },
            deleteSchema() {
                if (!window[this.title + 'Data'] && !window[this.title + 'Schema']) {
                    VueEventListener.fire('error', 'Invalid schema: ' + this.title);
                    return;
                }

                axios.post('http://localhost:8000/schema/delete', {
                    title: this.title,
                }).then(
                    () => {
                        VueEventListener.fire('success', "Schema deleted");
                        setTimeout(function(){
                            window.location.reload(1);
                        }, 5000);
                        this.$router.push({
                            name: 'Index'
                        });
                    }
                ).catch(
                    (error) => VueEventListener.fire('Error: ', (!!error.response) ? error.response.data : '')
                );

                this.popoverToggle();
            }
        }
    }
</script>

<style>

</style>