module.exports = {
	methods: {
		successNotification(message) {
			toastr.success(message, 'Success');
		},
		errorNotification(message) {
			toastr.error(message, 'Error');
		},
		warningNotification(message) {
			toastr.warning(message, 'Warning');
		},
		removeNotifications() {
			toastr.remove();
			// Could change to 'toastr.clear()', if you want to use animation to remove it.
		}
	},
	mounted() {
		VueEventListener.listen('success', (message) => this.successNotification(message));
		VueEventListener.listen('error', (message) => this.errorNotification(message));
		VueEventListener.listen('warning', (message) => this.warningNotification(message));
		VueEventListener.listen('remove', this.removeNotifications());
	}
};