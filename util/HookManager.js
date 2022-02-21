const { Collection, WebhookClient } = require('discord.js');
const axios = require('axios');

class HookManager {
	constructor(){
		this.webhooks = new Collection();// 웹훅 리스트
	}

	add(name, id, token){
		this.webhooks.set(name, new WebhookClient({id, token}));
		console.log(`WEBHOOK]${id}.${token}`);
	}

	send(target, message, username, avatar_url){
		if(this.webhooks.has(target)){
			this.webhooks.get(target).send({
				...message, username, avatar_url
			});
		}else{
			console.log('WEBHOOK]웹훅을 찾을 수 없음');
		}
	}

	sendUrl({id, token}, content, username, avatar_url){
		axios.post(`https://discord.com/api/webhooks/${id}/${token}`, {
			...content, username, avatar_url
		}, {
			'content-type': 'application/json',
		}).then(() => {
			console.log(`웹훅전송 - > ${sendText}/${username}`);
		}).catch(console.error);
	}
}

module.exports = HookManager;