const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder().setName('ping').setDescription('Replies with Pong!'),

  async execute (interaction) {
    const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true })
    interaction.editReply(`To demorando mais ou menos uns: ${sent.createdTimestamp - interaction.createdTimestamp}ms pra te responder, to cansado?`)
  }
}
