
const commands = require('#util/commands'); // 커맨드 관리자

const path = require("path");
const name = path.basename(__filename,".js");

module.exports = {
	name,
	description : "토론관련 옵션입니다.",
	...commands(path.join(__dirname, name))
};