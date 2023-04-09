const Discord = require('discord.js');
const ms = require('ms');
const messages = require("../utils/messages");

module.exports = {
    description: 'Çekiliş düzenlersiniz.',
    options: [
        {
            name: 'zaman',
            description: 'Çekilişe eklenecek süreyi belirtin. [10s, 10m, 10h, 10d]',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'kazanan-sayısı',
            description: 'Kaç kişinin kazanacağını belirtin.',
            type: Discord.ApplicationCommandOptionType.Integer,
            required: true
        },
        {
            name: 'ödül',
            description: 'Çekiliş ödülünü belirtin.',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'çekiliş',
            description: 'Düzenlenecek çekilişin mesaj ID\'sini belirtin.',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        }
    ],

    run: async (client, interaction) => {

        if(!interaction.member.permissions.has('ADMINISTRATOR') && !interaction.member.roles.cache.some((r) => r.name === "Çekiliş görevlisi")){
            return interaction.reply({
                content: 'Çekiliş düzenlemek için \`Yönetici\` yetkisine veya \`Çekiliş görevlisi\` rolüne sahip olmalısın.',
                ephemeral: true
            });
        }
    
        const query = interaction.options.getString('çekiliş');

        const giveaway = 
            client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) ||
            client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);

        if (!giveaway) {
            return interaction.reply({
                content: '[`'+ query + '`] ID\'li bir çekiliş bulunmuyor.',
                ephemeral: true
            });
        }

        if (giveaway.ended) {
            return interaction.reply({
                content: 'Düzenlemeye çalıştığın çekiliş bitmiş.',
                ephemeral: true
            });
        }
      
        const giveawayDuration = interaction.options.getString('zaman');
        const giveawayWinnerCount = interaction.options.getInteger('kazanan-sayısı');
        const giveawayPrize = interaction.options.getString('ödül');
        
        client.giveawaysManager.edit(query, {
            newWinnerCount: giveawayWinnerCount,
            newPrize: giveawayPrize,
            addTime: ms(giveawayDuration)
          
        }).then(() => {
          
       interaction.reply("Çekiliş düzenlendi.");
          
    })
  }
}