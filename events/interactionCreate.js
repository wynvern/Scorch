const scCore = require('../functions/scCore');

module.exports = {
	name: 'interactionCreate',
	once: false,

	async execute(interaction) {
		if (interaction.isCommand()) {
			// Warning, use editReply so that every command "is thinking..."
			await interaction.deferReply();

			const command = scCore.commands.slash.get(interaction.commandName);
			if (!command) return;

			try {
				await command.execute(interaction);
			}
			catch (error) {
				console.error(error);
			}
		}
	},
};