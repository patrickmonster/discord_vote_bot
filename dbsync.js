'use strict';
require('dotenv').config();
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json');
const models = require('#models/init-models');


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
	// db[modelName] = tables[modelName];
	tables[modelName].sync({alter: true});
});

