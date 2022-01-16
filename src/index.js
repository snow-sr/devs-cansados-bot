const fs = require('fs')
const { Client, Intents, Collection } = require('discord.js')
const { botToken, guildId } = require('./config') // TODO: change the guildId to DevsCansados Id

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })
client.usersMessagesBuffer = new Map()

client.commands = new Collection()

function setCommands(guild) {
  const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'))
  let commands;

  if (guild) {
    commands = guild.commands
  } else {
    commands = client.application?.commands
  }

  for (const file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.data.name, command)
    commands.create(command.data)
  }
}

function setSpamCollector(channel) {
  const { usersMessagesBuffer } = client
  const spamCollector = channel.createMessageCollector({ filter: message => !message.author.bot })
  spamCollector.on('collect', message => {
    // Pega as ultimas mensagens enviadas do usuário que enviou a mensagem
    let messages = usersMessagesBuffer.get(message.author.id)
    if (messages) {
      // Guarda apenas as ultimas 5 mensagens do usuário apenas
      if (messages.length >= 5) {
        messages.pop()
      }
      // Caso a mensagem seja repetida ela é deletada e respondida pelo BOT
      if (messages.includes(message.content.toLowerCase())) {
        message.channel.send('PARA DE SPAMMAR OW :face_with_symbols_over_mouth::face_with_symbols_over_mouth::face_with_symbols_over_mouth::face_with_symbols_over_mouth:')
        message.delete()
      } else {
        // Caso não seja uma mensagem repetida, o bot adiciona a mensagem em um Map, onde a key é o id do usuário e o value
        // é uma array das ultimas 5 mensagens enviadas pelo usuário
        messages.push(message.content.toLowerCase())
        usersMessagesBuffer.set(message.author.id, messages)
      }
    } else {
      // Caso a array de mensagens do usuário seja nula/indefinida, a mesma é inicializada e a primeira mensage é adicionada
      messages = []
      messages.push(message.content.toLowerCase())
      usersMessagesBuffer.set(message.author.id, messages)
    }
  })
}

function setMessageFilter(channel) {
  const filter = message => message.content.includes('discord') // TODO: create message filter
  const collector = channel.createMessageCollector({ filter })
  collector.on('collect', message => {
    message.channel.send('VOCÊ NÃO PODE MANDAR ISSO SEU COISA')
    message.delete()
  })
}

client.once('ready', async () => {
  console.log('Ready!')

  const guild = await client.guilds.fetch(guildId)

  setCommands(guild)

  guild.channels.cache.each(channel => {
    if (channel.type === 'GUILD_TEXT') {
      setMessageFilter(channel)

      setSpamCollector(channel)
    }
  })
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
