const { resolve } = require('path'),
	Keyv = require('keyv');

const storage = new Keyv(`sqlite://${resolve('./data/database/scBase.sqlite')}`);

console.log('Info︱Titan\'s database online');

storage.on('error', (error) => {
	console.error(error);
});

module.exports = storage;