module.exports = {
	props: {
		'name': String,
	},
	data() {
		return {
			deleteData: undefined,
		}
	},
	methods: {
		confirmDelete(name, id, event) {
			const element = $(event.target);
			if (typeof element.data("bs.popover") === "undefined")
				this.initialisePopover(name, id);
			$(event.target).popover('show');
		},
		deleteObject() {
			const schema = window[this.deleteData[0] + 'Schema'];
			if (typeof schema === "undefined") {
				NotificationEventListener.fire('error', 'Data could not be retrieved from: ' + this.name);
				return;
			}
			// WRITE TO FILE
			axios.post('http://localhost:8000/' + this.name + '/delete', {
				varName: schema.title,
				url: schema.url,
				id: this.deleteData[1]
			}).then(
				(response) => {
					NotificationEventListener.fire('success', "Object deleted");
					this.data = response.data;
					this.$router.push({
						name: 'AdminIndex',
						params: {
							'name' : this.name
						}
					});
				}
			).catch(
				(error) => NotificationEventListener.fire('error', error.response.data)
			);
			$("#popover" + this.deleteData[1]).popover('hide');
		},
		hidePopover() {
			$("#popover" + this.deleteData[1]).popover('hide');
		},
		initialisePopover(name, id) {
			const content = $("#popper-content");
			$(".popover-button").popover({
				'content': content,
				'html': true,
				'placement': 'top',
				'animation': true,
				trigger: 'click'
			})
				.on('show.bs.popover', () => {
					this.deleteData = [name, id];
					content.addClass('show');
				}).on('hide.bs.popover', () => {
					this.deleteData = undefined;
					content.removeClass('show');
				}
			);
		}
	}
};