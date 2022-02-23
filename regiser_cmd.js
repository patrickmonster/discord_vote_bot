const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { SlashCommandBuilder, ContextMenuCommandBuilder } = require('@discordjs/builders');

const axios = require("axios");
const { query } = require("#models")

const getCommands = require('#util/getCommands'); // 커맨드 관리자
// https://discord.com/api/users/@me
const [ idx ] = process.argv.slice(2);// 디버그 모드 (2이상)

const app = getCommands(`${__dirname}/app`); // 앱 명령\
const command = getCommands(`${__dirname}/command`); // 앱 명령\

let discord;
query("select",` value as token FROM code a WHERE idx=? AND a.type=0`, idx || 1).then(([{token}])=>{
    discord = new REST({ version: '9' }).setToken(token);
    return discord.get(Routes.user())
}).then(({id, username, discriminator})=>{
    console.log(`${username}#${discriminator}](${id}) 명령어 업데이트`);
    console.log(app.getApp());
    return discord.put(
        Routes.applicationCommands(id),
        { body : [
            ...app.getApp(),
            ...command.getApp()
        ]}
    );
}).then((data)=>{
    console.log("명령어 등록]", data);
}).catch(e => {
    console.error(e);
});