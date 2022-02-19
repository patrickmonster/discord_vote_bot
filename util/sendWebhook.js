const axios = require('axios');

// const webhookClient = new Discord.WebhookClient('id', 'token');
/**
 * 웹훅 전송
 * @param {*} id 웹훅아이디
 * @param {*} token 웹훅토큰
 * @param {*} sendText 전송메세지
 * @param {*} tag embd
 * @param {*} username
 * @param {*} userimg
 */
module.exports = function sendWebhook(id, token, sendText, tag, username, userimg) {
	// axios.patch(`https://discord.com/api/webhooks/${id}`)
	const content = { content : sendText };
	if (username)content.username = username;
	if (userimg)content.avatar_url = userimg;
	if (tag)content.embeds = [tag.toJSON()];

	if (process.env.NODE_ENV != 'production') {
		id = process.env.WEBHOOK_TEST_ID;
		token = process.env.WEBHOOK_TEST_TOKEN;
	}
	axios.post(`https://discord.com/api/webhooks/${id}/${token}`, content, {
		'content-type': 'application/json',
	}).then(() => {
		console.log(`웹훅전송 - > ${sendText}/${username}`);
	}).catch(console.error);
};