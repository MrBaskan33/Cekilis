const { Discord, EmbedBuilder } = require('discord.js');

module.exports = {
    description: 'Sunucudaki çekilişleri listeler.',
    
    run: async (client, interaction) => {

      
      if(!interaction.member.permissions.has('ADMINISTRATOR') && !interaction.member.roles.cache.some((r) => r.name === "Çekiliş görevlisi")){
          return interaction.reply({
              content: 'Çekilişleri görmek için \`Yönetici\` yetkisine veya \`Çekiliş görevlisi\` rolüne sahip olmalısın.',
              ephemeral: true
          });
      }

      let activeGiveaways = client.giveawaysManager.giveaways.filter((g) => g.guildId == interaction.guild.id);
      let giveaways = activeGiveaways.filter((g) => !g.ended);
    
      if (giveaways.length === 0) {
      interaction.reply('Şuanda sunucuda çekiliş bulunmuyor.');
      return;
    }

  const embed = new EmbedBuilder()
    .setTitle("Çekiliş listesi")
    .setColor("Blurple")
    .setDescription(`${giveaways.map((g) => `**Ödül**: ${g.data.prize}
**Kazanan(lar)**: ${g.data.winnerCount}
**Çekiliş ID**: ${g.messageId}
**Çekiliş kanalı**: <#${g.channelId}>
**Çekilişe git:** [Tıkla](https://discord.com/channels/${g.guildId}/${g.channelId}/${g.messageId})`).join("\n-------------------------------------\n")}`)
  
 return interaction.reply({embeds: [embed]});
        
 }
}
