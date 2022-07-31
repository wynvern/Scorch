const { SlashCommandBuilder } = require('@discordjs/builders');
const data = new SlashCommandBuilder()
	.setName('hug')
	.setDescription('Ações︱Abrace alguém e espalhe a fofura')
	.addUserOption(option =>
		option.setName('membro')
			.setDescription('O membro que você deseja abraçar')
			.setRequired(true),
	);

module.exports = {
	name: (data.name),
	data: data,

	async execute(interaction) {
		await interaction.editReply(`${interaction.user} deu um abraço em ${interaction.options.getUser('membro')}!`);
	},
};