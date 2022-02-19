const webhooks = require('#util/webhooks');

module.exports = function(error) {
	console.error(error);
	webhooks('error', 'shardError', [{ title : '소캣통신에러', description : `${error}` }]);
};