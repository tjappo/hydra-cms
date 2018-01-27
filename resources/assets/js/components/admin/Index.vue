<template>
    <div class="animated fadeIn admin-index-wrapper">
        <vue-headful
                :title="metaTitle ||'Shift - Decentralize the web'"
                :description="metaDescription || 'Page meta description'"
        />
        <div class="row justify-content-center">
            <div class="col">
                <div class="card">
                    <div class="card-header">
                        Overview items of <strong>{{name | capitalize}}</strong> page
                    </div>
                    <div class="card-body">
                        <router-link :to="{ name: 'AdminCreate', params: {'name': name}}" exact>
                            <a href="#" class="btn btn-primary">Create new {{name | capitalize}} item</a>
                        </router-link>
                        <div id="items-wrapper" class="table-responsive">
                            <table class="table">
                                <thead>
                                <tr>
                                    <th scope="col" v-for="key in getKeys()">{{key}}</th>
                                    <th scope="col">Options</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="item in data">
                                    <td :scope="getScope(key)" v-for="(value, key) in item">
                                        <img :src="config.exportPath + value" alt="image" v-if="key === 'image' && !!value"
                                             height="100px" width="100px">
                                        <ul class="list-group"
                                            v-else-if="Array.isArray(value) || typeof value === 'object' && !!value">
                                            <li class="list-group-item" v-for="(value2, key2) in value">
                                                <div class="d-block">
                                                    <span class="w-50"><strong>{{key2}}</strong></span>
                                                    <span class="w-50 float-right">{{value2 | truncate(25)}}</span>
                                                </div>
                                            </li>
                                        </ul>
                                        <span v-else>{{value | truncate(50)}}</span>
                                    </td>
                                    <td>
                                        <router-link :to="{ name: 'AdminEdit', params: {'name': name, 'id': item.id}}"
                                                     exact>
                                            <i class="fas fa-pencil-alt" aria-hidden="true"></i>
                                        </router-link>
                                        <i :id="'popover'+item.id" class="popover-button fas fa-trash-alt"
                                           aria-hidden="true"
                                           @click="confirmDelete(name, item.id, $event)"></i>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="popper-content" class="collapse">
            <p>Are you sure you want to delete this object?</p>
            <button class="btn btn-xs btn-primary" @click.prevent.stop="deleteObject()">Yes</button>
            <button class="btn btn-xs btn-default" @click.prevent.stop="hidePopover()">No</button>
        </div>
    </div>
</template>

<script>
	import DeleteMixin from './frontend/delete';
	import TextFilter from '../filters/textFilters';
	import Config from '../../../../../config.js';

	export default {
		mixins: [DeleteMixin, TextFilter],
		props: {
			'name': String
		},
		data() {
			return {
				data: undefined,
                config: Config,
			}
		},
		methods: {
			loadData() {
				const data = this.name + 'Data';

				if (!window[data]) {
					VueEventListener.fire('error', 'Data could not be retrieved from: ' + this.name);
					this.$router.push('/');
				}

				this.data = window[data];
			},
			getKeys() {
				if (typeof this.data !== "undefined" && this.data.length > 0) return Object.keys(this.data[0]);
			},
			getScope(key) {
				if (key === "id") return 'row';
			}
		},
		mounted() {
			this.loadData();
		},
		watch: {
			'$route.params.name'() {
				this.loadData();
			}
		}
	}
</script>

<style>
</style>