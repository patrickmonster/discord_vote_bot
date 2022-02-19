module.exports = {
	name : '_log',
	excute(client, ...param) {
		console.log(`(${client.user?.tag || "봇"}) ${param.join(' ')}`);
	},
};
