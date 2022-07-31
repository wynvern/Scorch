const { SlashCommandBuilder } = require('@discordjs/builders'),
	scStorage = require('../../data/scStorage'),
	data = new SlashCommandBuilder()
		.setName('remind')
		.setDescription('Ferramentas︱Posso te ajudar a lembrar de fazer alguma tarefa')
		.addSubcommand(sub => sub
			.setName('add')
			.setDescription('Adicionar um lembrete')
			.addStringOption(option => option
				.setName('nota')
				.setDescription('A descrição de seu lembrete')
				.setRequired(true),
			),
		)
		.addSubcommand(sub => sub
			.setName('list')
			.setDescription('Veja todos os seus lembretes salvos'),
		)
		.addSubcommand(sub => sub
			.setName('clear')
			.setDescription('Remova todos os seus lembretes salvos'),
		);

module.exports = {
	name: (data.name),
	data: data,

	async execute(interaction) {
		const reminders = await scStorage.get('users'),
			subCommand = interaction.options.getSubcommand();
		if (!reminders[interaction.user.id]) reminders[interaction.user.id] = {};
		if (!reminders[interaction.user.id].reminders) reminders[interaction.user.id].reminders = [];

		if (subCommand == 'add') {
			reminders[interaction.user.id].reminders.push(interaction.options.getString('nota'));
			await interaction.editReply({ content: 'Ok! Vou gravar seu lembrete com cuidado', ephemeral: true });
		}
		else if (subCommand == 'list') {
			if (!reminders[interaction.user.id].reminders.length) {
				await interaction.editReply({ content: 'Você ainda não possui nenhuma nota salva por mim', ephemeral: true });
				return false;
			}
			await interaction.editReply({ content: reminders[interaction.user.id].reminders.join(' '), ephemeral: true });
		}
		else if (subCommand == 'clear') {
			delete reminders[interaction.user.id].reminders;
			await interaction.editReply({ content: 'Todos os seus lembretes foram queimados com o meu fogo', ephemeral: true });
		}

		await scStorage.set('users', reminders);
	},
};