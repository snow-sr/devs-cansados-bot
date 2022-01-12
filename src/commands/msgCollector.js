const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageCollector } = require('discord.js');


module.exports = {
  data: new SlashCommandBuilder().setName('filtro_especial').setDescription('Filter a channel with your own parameters').addStringOption(option => option.setName('filter_option').setDescription('The string that you want to filter')),

  async execute(interaction) {

    const filterOption = interaction.options.getString('filter_option')
    const filter = m => m.content.includes(filterOption);
    const collector = interaction.channel.createMessageCollector({filter});

    interaction.reply("listening for the filters in the channel...")

    collector.on('collect', (interaction) =>{
      const client = require('../index.js');

      client.channels.cache.get(interaction.channel.id).send("Dont send links here fella!")

      interaction.delete()

    });

    collector.on('end', (collected, reason) => {
      interaction.reply("filtered messages ended!")
    });


  }
}
