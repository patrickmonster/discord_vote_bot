'use strict';
require('dotenv').config();

const { Client, Intents } = require('discord.js');
const axios = require("axios");
const { query } = require('#models');

const path = require("path");
process.setMaxListeners(0);
process.env.sep = path.sep;

const HookManager = require('#util/HookManager'); // 커맨드 관리자
const getCommands = require('#util/getCommands'); // 커맨드 관리자

const getMessage = require('#util/getMessage'); // 커맨드 관리자

const [ idx ] = process.argv.slice(2);// 디버그 모드 (2이상)

const client = new Client({ 
	intents: [ 
		Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.GUILD_VOICE_STATES,
	],
	partials: ["CHANNEL"]
});

// ////////////////////////////////////////////////////////////////////////////////////////////////
// 이벤트 관리자
client.resetCompCmd = require('#event/init')(client); // 샤딩 명령 처리
client._webhooks = new HookManager();

// 커맨드 관리자
client.system_app = getCommands(`${__dirname}/app`); // 앱 명령
client.system_button = getCommands(`${__dirname}/button`); // 메세지 명령
client.system_command = getCommands(`${__dirname}/command`); // 메세지 명령


// 기본 이벤트
const message = require('#event/message');
const interaction = require('#event/interaction');
const voiceStateUpdate = require('#event/voiceStateUpdate');

// 샤드 이벤트
const guildCreate = require('#event/guildCreate');
const guildDelete = require('#event/guildDelete');
const threadDelete = require('#event/threadDelete');
const threadUpdate = require('#event/threadUpdate');
const shardError = require('#event/shardError');


// ////////////////////////////////////////////////////////////////////////////////////////////////
client.on('messageCreate', message); // 메세지 생성
client.on('interactionCreate', interaction); // 상호작용

client.on('voiceStateUpdate', voiceStateUpdate); // 음성채널 상태 업데이트

// 길드 생성 이벤트
client.on('guildCreate', guildCreate);
client.on('guildDelete', guildDelete);

client.on('threadDelete', threadDelete);
client.on('threadUpdate', threadUpdate);

client.on('shardError', shardError);

// ////////////////////////////////////////////////////////////////////////////////////////////////
// 디버깅
client.on('debug', function(info) {
	if (info.includes('Exceeded identify threshold')) {
		const time = info.split(' ').pop();
		client._webhooks.send('error', {
			content : '디스코드 서비스 연결 문제',
			embeds :  [getMessage({ title: '연결 지연중...', content: time })]
		});
	}
	else if (info.includes('Session Limit Information')) {
		client._webhooks.send('error', {
			content : 'Session Limit Information',
			embeds : [getMessage({ title: '세션 제한 (잔여 연결수)', content: info.replace('[WS => Manager] Session Limit Information', '') })]
		});
	}
	else if (info.includes('[DESTORY]') || info.includes('[CONNECT]')) {
		client._log(new Date(), info);
	}
});

// 준비
client.once('ready', () => {
	client._log(`starting live service.... ${new Date()}`);
	client._log(`Logged in as ${client.user.tag}!`);
	client.setActivityProfile(`${client.guilds.cache.size}개의 그룹과 함께`, 'PLAYING', 0);
	client.application.commands.fetch().then(commands => {
		client._log(`등록명령어 개수 : ${commands.size}`);
		client._log(`\n${commands.toJSON().map(({name,type, id, options})=> `${type} ${name}(${id}) - ${options.length}`).join("\n")}`);
	});
});
// ///////////////////////////////////////////////////////////////////////////////////////////
//  개조용 코드
const interactionCreateHandle = client.actions.InteractionCreate.handle;
client.actions.InteractionCreate.handle = function(packet){
	const { type } = packet;
	if(type == 5){
		
	}else interactionCreateHandle.call(this,packet)
}

// const handlePacket = client.handlePacket;
// client.handlePacket = function(packet, shard){
// 	console.log(packet, shard);
// 	handlePacket(packet, shard);
// }
// ///////////////////////////////////////////////////////////////////////////////////////////
// 봇 실행코드
query("select",`value as code, arg0 as name FROM code a WHERE a.type='1'`).then((hooks) =>{
	hooks.forEach(({code, name}) => { // 편집
		const [id, token] = code.split("/");
		client._webhooks.add(name, id, token);
	});
	return query("select",` value FROM code a WHERE idx=? AND a.type=0`, idx || 1);
}).then(([{value}])=>{
	client._api = axios.create({  baseURL : "https://discord.com/api/", headers: { 'Authorization': `Bot ${value}` } });
	client.login(value);
}).catch(e => {
	console.error(e);
	client._webhooks.send('error', { content : '디스코드 컨넥션 에러', embeds : [ getMessage({ title: 'Client login error', content: `채널 로그인 에러${e}` }) ] });
});

process.on('unhandledRejection', error => {
	console.error(error);
	client._webhooks.send('error', { content : 'unhandledRejection', embeds : [ getMessage({ title: '프로세서 에러',  content : `${error}` }) ] });
});

process.on('SIGINT', function() {
	console.error(`=============================${process.pid}번 프로세서가 종료됨=============================`);
	process.exit();
});