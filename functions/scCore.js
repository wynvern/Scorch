const { resolve } = require('path'),
	{ readdirSync } = require('fs'),
	{ Routes } = require('discord-api-types/v9'),
	{ REST } = require('@discordjs/rest');

require('dotenv').config();
const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

const scCore = {
	commands: {
		slash: {
			executables: {},
			commands: [],
			resolves: {},

			/**
             * Get the function to execute a slash command.
             *
             * @param {string} name The name of the slash command.
             * @returns The executable of the slash command.
             */
			get(name) {
				return this.executables[name];
			},

			/**
             * Loads all the commands from a given path and sends them via REST.
             *
             * @param {path} dir The path to load the slash commands.
             */
			async load(dir) {
				readdirSync(resolve(dir), { withFileTypes: true })
					.filter(direct => direct.isDirectory())
					.forEach(async folder => {
						readdirSync(resolve(`${dir}/${folder.name}`))
							.filter(file => file.endsWith('.js'))
							.forEach(file => {
								file = require(resolve(`${dir}/${folder.name}/${file}`));
								this.commands.push(file.data.toJSON());
								this.executables[file.name] = file;
								if (file.resolve) this.resolves[file.name] = file.resolve;
							});
					});

				this.sendRest(this.commands, '932351240648679474');
			},

			/**
             * Sends the list of commands to the discord API.
             *
             * @param {list} commands The list of commands to be send.
             * @param {snowflake} guild The guild that will recive the commands (will be global).
             */
			async sendRest(commands, guild) {
				if (!commands.length) return console.log('Info︱No slash command was present');

				try {
					const routesData = Routes.applicationGuildCommands(process.env.USER_ID, guild);
					await rest.put(routesData, { body: commands });
					console.log('Info︱Slash commands uploaded');
				}
				catch (error) { console.error(error); }
			},
		},
	},

	events: {
		/**
         * Loads all the event files from a given path.
         *
         * @param {Client} client The client from the bot.
         * @param {path} dir The path to browse the events.
         */
		load(client, dir) {
			readdirSync(resolve(dir))
				.filter(file => file.endsWith('.js'))
				.forEach(async event => {
					event = require(`${resolve(dir)}/${event}`);
					if (event.once) {
						client.once(event.name, (...args) => event.execute(...args));
					}
					else {
						client.on(event.name, (...args) => event.execute(...args));
					}
				});
		},
	},

};

module.exports = scCore;