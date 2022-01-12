const fs = require('fs')
const { Client, Intents, Collection } = require('discord.js')
const { botToken } = require('./config') // TODO: change the guildId to DevsCansados Id

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

client.commands = new Collection()

const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.data.name, command)
}

client.once('ready', () => {
  console.log('Ready!')
  //const channel = client.channels.cache.get('722517212702965762'); //TODO: change to devscansados channel id
  //channel.send('Toca aquela braba do tim maia!')
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return

  const command = client.commands.get(interaction.commandName)

  if (!command) return

  try {
    await command.execute(interaction)
  } catch (error) {
    console.error(error)
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true })
  }
})

client.login(botToken)

module.exports = client
