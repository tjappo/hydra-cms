module.exports = {
	data() {
		return {
			metaData: metaData,
			page: {
				'title': undefined,
				'description': undefined,
			},
		}
	},
	methods: {
		initialise() {
			for (let i = 0; i < this.metaData.length; i++) {
				if (this.metaData[i].page === this.$route.name) {
					this.page = this.metaData[i];
					return;
				}
			}
		},
	},
	mounted() {
		this.initialise();
	},
	computed: {
		metaTitle() {
			return this.page.title || 'Shift - Decentralize the web';
		},
		metaDescription() {
			return this.page.description || 'Meta description of the page';
		}
	}
};