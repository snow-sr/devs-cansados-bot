const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder().setName('link').setDescription('sends your link if you can do this (special role)').addStringOption(option => option.setName('link').setDescription('The link that you want to send')),

  async execute(interaction) {

    const client = require('../index.js');
    const channel = client.channels.cache.get(interaction.channel.id)
    const member = interaction.member

    interaction.reply("sending your link...", {ephemeral: true})

    const link = interaction.options.getString('link')

    if (member.roles.cache.some(role => role.name === 'admin' || role.name === 'active user')) {
      channel.send(`${interaction.user.username} aqui está seu link: ${link}`)
    } else {
      interaction.reply("you dont have the special role!")
    }

  }

}
