const { SlashCommandBuilder } = require('@discordjs/builders'),
	{ PermissionFlagsBits } = require('discord.js'),
	data = new SlashCommandBuilder()
		.setName('echo')
		.setDescription('Ferramentas︱Envio a sua mensagem com o meu nome')
		.addStringOption(option => option
			.setName('mensagem')
			.setDescription('A mensagem que eu enviarei')
			.setRequired(true),
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

module.exports = {
	name: (data.name),
	data: data,

	async execute(interaction) {
		await interaction.editReply({ content: interaction.options.getString('mensagem'), ephemeral: false });
	},
};