const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder().setName('unlock_sentence').setDescription('remove a restrict word or sentence to the blocked sentence list')
    .addStringOption(option => option.setName('sentence').setDescription('The sentence that you want to unlock')),

  async execute(interaction) {

    const { blockedSentences } = require('../index.js');

    const sentence = interaction.options.getString('sentence').toLowerCase()
    if (!blockedSentences.includes(sentence)) {
      interaction.reply("Sentence is not blocked!")
    } else {
      blockedSentences.splice(blockedSentences.indexOf(sentence), 1)
      interaction.reply("Sentence unlocked!")
    }

  }

}
