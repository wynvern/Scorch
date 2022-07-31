module.exports = {
	name: 'ready',
	once: true,

	async execute(client) {
		client.user.setActivity({ name: 'eu não sou gordo, estou apenas um pouco acima do peso', type: 'CUSTOM' });
		console.log('Info︱\x1b[37mScorch\x1b[0m is ready to burn everything down');
	},
};