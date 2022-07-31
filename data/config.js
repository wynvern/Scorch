const { GatewayIntentBits } = require('discord.js');

const config = {
	intents: {
		intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages ],
	},
};

module.exports = config;