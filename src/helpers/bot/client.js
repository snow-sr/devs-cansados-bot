const { Client, Intents } = require('discord.js')
const { botToken } = require('../../config')

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES
  ]
})

client.login(botToken)

module.exports = client
