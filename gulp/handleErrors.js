// Error Handler
module.exports = function (gulp, $) {
    return function () {
			$.notify.onError({
			title: "Compile Error",
			message: "<%= error.message %>"
		}).apply(this, arguments);

		// Keep gulp from hanging on this task
		this.emit('end');
	}
};