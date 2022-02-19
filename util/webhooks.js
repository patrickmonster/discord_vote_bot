const { Collection, WebhookClient } = require('discord.js');

const { query } = require("#models");

const sendWebhook = require('./sendWebhook');


const webhooks = {
};

const wh = new Collection();// 웹훅 리스트

// 웹훅 코드 리스트에서 불러옴
query("select",`value as code, arg0 as name FROM code a WHERE a.type='1'`).then((hooks) =>{
	hooks.forEach(({code, name}) => {
		const [id, token] = code.split("/");
		webhooks[name] = {id, token};
	});
	
	for (const k of Object.keys(webhooks)) {
		let wc
		try {
			wc = new WebhookClient(webhooks[k])
			console.log(`WEBHOOK]${Object.values(webhooks[k])}`);
		}catch (e) {
			console.log(`웹훅 생성 에러 ${k} ${webhooks[k]}`, e);
			process.exit(1)
		}
		wh.set(k, wc);
	}
});

module.exports = function(target, message, tag, username, avatarURL) {
	if (typeof target == 'string') {
		if (wh.has(target)) {
			const webhook = wh.get(target);
			const content = {};
			if (username) content.username = username;
			if (avatarURL) content.avatarURL = avatarURL;
			if (tag) content.embeds = [tag];
			if (message) content.content = message;
			if (webhook) webhook.send(content);
		}
		else {
			console.log('웹훅 처리에러 - 웹훅을 찾을 수 없음');
		}
	}
	else if (target.length == 2) {
		sendWebhook(target[0], target[1], message, tag, username, avatarURL);
	}
	else {
		console.log('웹훅 처리에러 - 파라메타가 올바르지 않음');
	}
};