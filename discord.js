'use strict';
require('dotenv').config();

const { Client, Intents } = require('discord.js');
const { query } = require('#models');

const path = require("path");
process.setMaxListeners(0);
process.env.sep = path.sep;

const getCommands = require('#util/getCommands'); // 커맨드 관리자
const webhooks = require('#util/webhooks'); // 커맨드 관리자

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

// 커맨드 관리자
client.system_app = getCommands(`${__dirname}/app`); // 메세지 명령
client.system_button = getCommands(`${__dirname}/button`); // 메세지 명령


// 기본 이벤트
const message = require('#event/message');
const interaction = require('#event/interaction');
const voiceStateUpdate = require('#event/voiceStateUpdate');

// 샤드 이벤트
const guildCreate = require('#event/guildCreate');
const guildDelete = require('#event/guildDelete');
const threadDelete = require('#event/threadDelete');
const shardError = require('#event/shardError');


// ////////////////////////////////////////////////////////////////////////////////////////////////
client.on('messageCreate', message); // 메세지 생성
client.on('interactionCreate', interaction); // 상호작용

client.on('voiceStateUpdate', voiceStateUpdate); // 음성채널 상태 업데이트

// 길드 생성 이벤트
client.on('guildCreate', guildCreate);
client.on('guildDelete', guildDelete);

client.on('threadDelete', threadDelete);

client.on('shardError', shardError);

// ////////////////////////////////////////////////////////////////////////////////////////////////
// 디버깅
client.on('debug', function(info) {
	if (info.includes('Exceeded identify threshold')) {
		const time = info.split(' ').pop();
		webhooks('error', '디스코드 서비스 연결 문제', getMessage({ title: '연결 지연중...', content: time }));
	}
	else if (info.includes('Session Limit Information')) {
		webhooks('error', 'Session Limit Information', getMessage({ title: '세션 제한 (잔여 연결수)', content: info.replace('[WS => Manager] Session Limit Information', '') }));
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
// 봇 실행코드
query("select",` value FROM code a WHERE idx=? AND a.type=0`, idx || 1).then(([{value}])=>
	client.login(value)
).catch(e => {
	webhooks('error', '디스코드 컨넥션 에러', getMessage({ title: 'Client login error', content: `채널 로그인 에러${e}` }));
});

process.on('unhandledRejection', error => {
	console.error(error);
	webhooks('error', 'unhandledRejection', getMessage({ title: '프로세서 에러',  content : `${error}` }));
});

process.on('SIGINT', function() {
	console.error(`=============================${process.pid}번 프로세서가 종료됨=============================`);
	process.exit();
});