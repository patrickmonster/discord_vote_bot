module.exports = {
	name : '_err',
	excute(client, ...param) {
		console.error(`${new Date()}] (${client.user.tag}) ${param.join(' ')}`);
	},
};
