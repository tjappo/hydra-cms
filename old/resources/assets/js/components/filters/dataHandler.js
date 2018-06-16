module.exports = {
	computed: {
		allRoutes() {
			let result = [];
			for (let name in window) {
				if (name.length >= 4 && name.indexOf('Data') !== -1) {
					name = name.substring(0, name.length - 4);
					if (!!window[name + 'Schema']) {
						result.push(name);
					}
				}
			}
			return result;
		}
	}
};