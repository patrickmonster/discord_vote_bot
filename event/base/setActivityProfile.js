let index = 0;
let loop = 0;
const ments = {};

function changeLoop(client) {
	const keys = Object.keys(ments);
	index++;
	if (index >= keys.length) { index = 0; }
	client.user.setActivity(ments[keys[index]]);
}


module.exports = {
	name : 'setActivityProfile',
	excute(client, message, type = 'LISTENING', key = 0) {
		if (!loop) {
			client.user.setActivity(message);
			loop = setInterval(changeLoop, 1000 * 60, client);
		}
		ments[key] = { name : message, type };
	},
};