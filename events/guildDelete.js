const scStorage = require('../data/scStorage');

module.exports = {
	name: 'guildDelete',
	once: false,

	async execute(guild) {
		await scStorage.delete(guild.id);

		console.log(`Info︱Titan removed from the guild ${guild.name}`);
	},
};