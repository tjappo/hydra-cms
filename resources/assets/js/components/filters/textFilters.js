module.exports = {
	filters: {
		truncate: function (content, length, clamp) {
			clamp = clamp || '...';
			return content.length > length ? content.substring(0, length - clamp.length) + clamp : content;
		}
	}
};