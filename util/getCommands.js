const fs = require('fs');
const path = require("path");
const { Collection } = require('discord.js');

/**
 * 모듈 캐시 제거 - 파일업데이트시
 * @param {*} module
 */
function nocache(module, callback) {
	fs.watchFile(
		path.resolve(module), 
		() => {
			delete require.cache[require.resolve(module)];
			callback(module);
		}
	);
}

function load(commandsDir) {
	const command = new Collection();
	const commandFolders = fs.readdirSync(commandsDir).filter(file => file.endsWith('.js'));
	const map = new Map();
	for (const file of commandFolders) {
		loadCmd(command, map, path.join(commandsDir, file));
	}
	return { command, map };
}

/**
 * 커맨드 로드 모듈 - 파일 수정시, 자동으로 업데이트
 * @param {*} command 명령어(인식)
 * @param {*} map 경로 맵
 * @param {*} path 경로
 * @returns
 */
function loadCmd(command, map, path) {
	const reload = (module) => {
		try {
			const cmd = require(path);
			console.log(`[파일관리자] 파일 ${module ? '업데이트' : '생성'} - ${path}`);
			command.set(cmd.name, cmd);// 명령 탐색용
			map.set(path, cmd);

			cmd._path = path;// 경로
		}
		catch (e) {
			console.error(e);
			console.log(`[파일관리자] 파일 제거 - ${path}`);
			try{
				map.delete(path);
				const cmd = map.get(path);
				command.delete(cmd.name);
			}catch(e){;}
		}
	};
	reload();
	nocache(path, reload);// 변경사항 등록
}
/**
 * 커맨드 관리 모델
 * @param {*} target 탐색위치
 */
module.exports = function getCommands(target) {
	const { command, map } = load(target);
	return {
		command,
		get: (cmd) => command.get(cmd) || command.find(c => c.aliases && c.aliases.includes(cmd)), // 명령어 탐색
		update: () => {
			const commandFolders = fs.readdirSync(target).filter(file => file.endsWith('.js')); // 파일 전체탐색
			for (const file of commandFolders) {
				const path = `${target}${process.env.sep}${file}`;
				if (!map.has(path)) {
					loadCmd(command, map, path);
				}
			}
		},
		getApp(){
			return [...this.command.values()].map((cmd)=>{
				return cmd.type == 1 ? {...cmd} : {
					name : cmd.name,
					type : cmd.type,
					default_permission : cmd.default_permission,
				};
			})
		}
	};
};