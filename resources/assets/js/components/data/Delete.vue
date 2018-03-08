<template>
    <div class="d-inline">
        <i :id="'popoverData-' + id" class="popover-button fas fa-trash-alt"
           aria-hidden="true"
           @click="popoverToggle"></i>
        <b-popover :target="'popoverData-' + id" title="Delete Data" :show.sync="showPopover">
            <p>Are you sure you want to delete this data?</p>
            <button class="btn btn-xs btn-primary" @click.prevent.stop="deleteObject">Yes</button>
            <button class="btn btn-xs btn-default" @click.prevent.stop="popoverToggle">No</button>
        </b-popover>
    </div>
</template>

<script>
    export default {
        name: 'DeleteData',
        props: {
            name: [String],
            id: [String, Number],
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
            deleteObject() {
                const schema = window[this.name + 'Schema'];
                if (!window[this.name + 'Data'] && !schema) {
                    VueEventListener.fire('error', 'Invalid schema: ' + this.name);
                    return;
                }
                // WRITE TO FILE
                axios.post('http://localhost:8000/data/' + this.name + '/delete', {
                    varName: schema.title,
                    url: schema.url,
                    id: this.id
                }).then(
                    (response) => {
                        VueEventListener.fire('success', "Data deleted");
                        window[schema.title] = response.data;
                        this.$router.push({
                            name: 'AdminIndex',
                            params: {
                                'name': this.name
                            }
                        });
                    }
                ).catch(
                    (error) => VueEventListener.fire('Error: ', (!!error.response) ? error.response.data : '')
                );
                this.popoverToggle();
            },
        },
    }
</script>