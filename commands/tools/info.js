const { SlashCommandBuilder } = require('@discordjs/builders'),
	{ PermissionFlagsBits } = require('discord.js'),
	infoEmbeds = require('./addons/toolsEmbeds').info,
	data = new SlashCommandBuilder()
		.setName('info')
		.setDescription('Ferramentas︱Precisa de informações de canais, servidores e outros?')
		.addSubcommand(sub => sub
			.setName('channel')
			.setDescription('Veja informações de um canal de texto')
			.addChannelOption(option => option
				.setName('channel')
				.setRequired(true)
				.setDescription('O canal para ver as informações'),
			),
		)
		.addSubcommand(sub => sub
			.setName('member')
			.setDescription('Veja informações de um membro do servidor')
			.addUserOption(option => option
				.setName('member')
				.setRequired(true)
				.setDescription('O membro para buscar informações'),
			),
		)
		.addSubcommand(sub => sub
			.setName('guild')
			.setDescription('Veja informações do servidor atual'),
		)
		.setDefaultMemberPermissions(PermissionFlagsBits.Administrator);

module.exports = {
	name: (data.name),
	data: data,

	async execute(interaction) {
		const subCommand = interaction.options.getSubcommand();

		if (subCommand == 'channel') {
			const channelData = interaction.option.getChannel('channel');
			await interaction.editReply({ embeds: [(await infoEmbeds.channel(channelData, interaction.user))], ephemeral: true });
		}
		else if (subCommand == 'member') {
			const memberData = interaction.option.getUser('member');
			await interaction.editReply({ embeds: [(await infoEmbeds.member(memberData, interaction.user))], ephemeral: true });
		}
		else if (subCommand == 'guild') {
			await interaction.editReply({ embeds: [(await infoEmbeds.guild(interaction.guild, interaction.user))], ephemeral: true });
		}
	},
};