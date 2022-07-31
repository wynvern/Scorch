const { SlashCommandBuilder } = require('@discordjs/builders'),
	{ PermissionFlagsBits } = require('discord.js'),
	data = new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Ferramentas︱Veja qual é a minha latência com a API do Discord')
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

module.exports = {
	name: (data.name),
	data: data,

	async execute(interaction) {
		await interaction.editReply({ content: `🏓Latency is ${Date.now() - interaction.createdTimestamp}ms. API Latency is ${Math.round(interaction.ws.ping)}ms`, ephemeral: false });
	},
};