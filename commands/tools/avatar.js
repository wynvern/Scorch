const { SlashCommandBuilder } = require('@discordjs/builders'),
	userAvatarEmbed = require('./addons/toolsEmbeds').avatar,
	data = new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Úteis︱Mostra o avatar de alguém')
		.addUserOption(option => option
			.setName('member')
			.setRequired(true)
			.setDescription('Pesquisa︱O membro que será buscado o avatar'),
		);

module.exports = {
	name: 'avatar',
	data: data,

	async execute(interaction) {
		const mentionedUser = interaction.options.getUser('member');
		await interaction.editReply({ embeds: [(await userAvatarEmbed(mentionedUser, interaction.user))], ephemeral: true });
	},
};