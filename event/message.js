module.exports = function(message) {
	const { content, author, client, channel, mentions } = message;
	const [commend, ...args] = content.split(' ');
	if (!channel.isText() || author.bot) return;
	// ///////////////////////////////////////////////////////////////////////////////////////////
	if (client.witelist.includes(author.id) && content.startsWith('$')) { // 봇 관리자
		const c = client.system_cmd.get(commend);
		if (c) {
			message.reply(`명령실행 - ${commend}`);
			return c.execute(message, args);
		}
		else {
			message.reply(`명령실행 실패 - ${commend}`);
		}
		return;
	}
	// ///////////////////////////////////////////////////////////////////////////////////////////
	if(channel.type == 'DM'){
		const c = channel.client.system_dm.get(commend);
		if(c){ 
			return c.execute(message, args);
		}
		channel.send({
			embeds : [
				getTitle("봇은 현재 메세지 입력이 불가능해요 8ㅅ8").setDescription(`
문의사항을 입력 및 전송하고 하단의 이미지를 참고하여 문의를 해 주세요!
				`).setImage("https://cdn.discordapp.com/attachments/682449668428529743/929350279026049094/unknown.png")
			]
		});
		console.log(author.tag, channel.id, content);
		return;
	}
};