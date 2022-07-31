const { EmbedBuilder } = require('discord.js');

const eventEmbeds = {
	async guildCreate(guild) {
		const newEmbed = new EmbedBuilder()
			.setColor(0xDACCBD)
			.setTitle('Scorch')
			.setAuthor({ name: guild.name, iconURL: guild.iconURL() })
			.setDescription('Muito obrigado por me adicionar em seu servidor. Espero poder ajudar!')
			.addFields(
				{ name: 'Sobre', value: 'Eu sou um titã do universo de Titanfall, não me dou muito bem no meio da guerra, por isso decidi ir para um lugar mais calmo.' },
				{ name: 'Utilização', value: 'Para executar um comando use o prefixo *sc#* que pode ser alterado futuramente. Para ajuda, digite *sc#help*.' },
			)
			.setFooter({ text: 'Feito com ♥ por wynvern', iconURL: 'https://i.imgur.com/tPRWARP.jpg' })
			.setTimestamp();

		return newEmbed;
	},
};

module.exports = eventEmbeds;