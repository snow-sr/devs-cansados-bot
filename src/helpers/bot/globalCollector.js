const client = require('./client')
const { guildId } = require('../../config')
const sleep = require('../await')

const globalCollector = async () => {
  const filter = message => message.content.includes('discord') // TODO: create message filter
  const guild = await client.guilds.fetch(guildId)
  guild.channels.cache.each(channel => {
    if (channel.type === 'GUILD_TEXT') {
      const collector = channel.createMessageCollector({ filter })
      collector.on('collect', message => {
        message.delete()
          .then(sleep(200))
          .then(message.channel.send('VOCÊ NÃO PODE MANDAR ISSO SEU COISA'))
      })
    }
  })
}

module.exports = globalCollector
