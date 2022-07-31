const { Client } = require('discord.js'),
	scCore = require('./functions/scCore');

require('dotenv').config();
const Scorch = new Client(require('./data/config.js').intents);

scCore.commands.slash.load('./commands');
scCore.events.load(Scorch, './events');

Scorch.login(process.env.TOKEN);