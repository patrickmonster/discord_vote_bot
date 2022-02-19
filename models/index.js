'use strict';
require('dotenv').config();
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json');
const models = require('./init-models');
const db = {};


console.log(config);
let sequelize;
if(env == "development"){
	sequelize = new Sequelize({
		dialect: 'sqlite',
		storage: 'config/database.sqlite'
	});
}else{
	sequelize = new Sequelize(
		config.database,
		config.username,
		config.password,
		config,
	);
}

const tables = models(sequelize);

Object.keys(tables).forEach((modelName) => {
	db[modelName] = tables[modelName];
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Op = Sequelize.Op;

// 쿼리 자동 완성식
db.query = (type,query, ...replacements)=>{
	type = type.toUpperCase();
	return sequelize.query(`${type} ${query}`, { type: sequelize.QueryTypes[type] , replacements });
}
// 풀 쿼리식
db.Q = (type,query, ...replacements)=>{
	type = type.toUpperCase();
	return sequelize.query(`${query}`, { type: sequelize.QueryTypes[type] , replacements });
}

module.exports = db;