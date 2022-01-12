const fs = require("fs")
const { Client, Intents, Collection } = require('discord.js');
const { bot_token } = require('./config.json'); // TODO: change the guildId to DevsCansados Id

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');

	// enviar mensagens: --> const channel = client.channels.cache.get('722517708742066218'); //TODO: change to devscansados channel id
	// enviar mensagens: --> channel.send("Hey there, estamos online!")

});



client.on('interactionCreate', async interaction => {

	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}

});

client.login(bot_token);