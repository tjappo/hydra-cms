module.exports = {
	filters: {
		truncate: function (content, length, clamp) {
			clamp = clamp || '...';
			return content.length > length ? content.substring(0, length - clamp.length) + clamp : content;
		},
		capitalize: function (value) {
			if (!value) return '';
			value = value.toString();
			return value.charAt(0).toUpperCase() + value.slice(1);
		},
		numberWithCommas: (number) => {
			return (!!number) ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 'NaN';
		}
	}
};