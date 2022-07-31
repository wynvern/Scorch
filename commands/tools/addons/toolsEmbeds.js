const { EmbedBuilder } = require('@discordjs/builders');

const toolsEmbeds = {
	async avatar(member, author) {
		const newEmbed = new EmbedBuilder()
			.setColor(0xDACCBD)
			.setAuthor({ name: member.username, iconURL: member.displayAvatarURL() })
			.setImage(`${member.displayAvatarURL()}?size=2048`)
			.setFooter({ text: author.username, iconURL: author.displayAvatarURL() })
			.setTimestamp();

		return newEmbed;
	},

	info: {
		async channel(channel, author) {
			const newEmbed = new EmbedBuilder()
				.setColor(0xDACCBD)
				.setAuthor({ name: channel.name })
				.setFooter({ text: author.username, iconURL: author.displayAvatarURL() })
				.setTimestamp();

			return newEmbed;
		},

		async guild(guild, author) {
			const newEmbed = new EmbedBuilder()
				.setColor(0xDACCBD)
				.setAuthor({ name: guild.name, iconURL: guild.iconURL() })
				.setFooter({ text: author.username, iconURL: author.displayAvatarURL() })
				.setTimestamp()
				.setThumbnail(guild.iconURL())
				.addFields(
					{ name: 'Geral', value: `Dono: ${await guild.fetchOwner()}\nID: \`${guild.id}\`\nCriado em: \`${new Date(guild.createdTimestamp).toLocaleDateString()}\`\nBoosts: \`${guild.premiumSubscriptionCount}\``, inline: true },
					{ name: 'Extras', value: `Cargo mais alto: ${guild.roles.highest}\nCargos: \`${guild.roles.cache.size}\`\nCanais: \`${guild.channels.channelCountWithoutThreads}\` - Texto: \`${guild.channels.cache.filter(c => c.type == '0').size}\` - Voz: \`${guild.channels.cache.filter(c => c.type == '2').size}\`\nMembros: \`${guild.memberCount}\``, inline: true },
				);

			return newEmbed;
		},

		async member(member, author) {
			const newEmbed = new EmbedBuilder()
				.setColor(0xDACCBD)
				.setAuthor({ name: member.username, iconURL: member.displayAvatarURL() })
				.setFooter({ text: author.username, iconURL: author.displayAvatarURL() })
				.setTimestamp();

			return newEmbed;
		},
	},
};

module.exports = toolsEmbeds;