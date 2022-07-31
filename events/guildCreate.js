const scStorage = require('../data/scStorage'),
	guildCreateEmbed = require('./addons/eventEmbeds').guildCreate;

module.exports = {
	name: 'guildCreate',
	once: false,

	async execute(guild) {
		const newGuild = {
			prefix: 'sc#',
			reactions: {},
			extras: {},
			customCommands: {},
			id: guild.id,
			config: {},
		};

		await scStorage.set(guild.id, newGuild);
		const channel = guild.channels.cache.filter(c => c.type == '0').first();
		if (channel) await channel.send({ embeds: [(await guildCreateEmbed(guild))] });

		console.log(`Info︱Titanfall occourred in the guild ${guild.name}`);
	},
};