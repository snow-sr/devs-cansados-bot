const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder().setName('block_sentence').setDescription('add a restrict word or sentence to the blocked sentence list')
    .addStringOption(option => option.setName('sentence').setDescription('The sentence that you want to block')),

  async execute(interaction) {

    const { blockedSentences } = require('../index.js');

    const sentence = interaction.options.getString('sentence').toLowerCase()
    if (blockedSentences.includes(sentence)) {
      interaction.reply("Sentence already blocked!")
    } else {
      blockedSentences.push(sentence)
      interaction.reply("Sentence blocked!")
    }

  }

}
