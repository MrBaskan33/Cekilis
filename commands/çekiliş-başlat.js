const Discord = require('discord.js');
const ms = require('ms');
const messages = require("../utils/messages");

module.exports = {
    description: 'Çekiliş başlatırsınız.',
    options: [
        {
            name: 'zaman',
            description: 'Çekiliş süresini belirtin. [10s, 10m, 10h, 10d]',
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
            name: 'kanal',
            description: 'Çekilişin başlayacağı kanalı belirtin.',
            type: Discord.ApplicationCommandOptionType.Channel,
            required: true
        }
    ],

    run: async (client, interaction) => {

        if(!interaction.member.permissions.has('ADMINISTRATOR') && !interaction.member.roles.cache.some((r) => r.name === "Çekiliş görevlisi")){
            return interaction.reply({
                content: 'Çekiliş yapmak için \`Yönetici\` yetkisine veya \`Çekiliş görevlisi\` rolüne sahip olmalısın.',
                ephemeral: true
            });
        }
    
        const giveawayChannel = interaction.options.getChannel('kanal');
        const giveawayDuration = interaction.options.getString('zaman');
        const giveawayWinnerCount = interaction.options.getInteger('kazanan-sayısı');
        const giveawayPrize = interaction.options.getString('ödül');
        
        if(!giveawayChannel.isTextBased()) {
            return interaction.reply({
                content: 'Çekilişi yalnızca yazı kanallarında başlatabilirsin.',
                ephemeral: true
            });
        }
    
        client.giveawaysManager.start(giveawayChannel, {
            duration: ms(giveawayDuration),
            prize: giveawayPrize,
            winnerCount: giveawayWinnerCount,
            hostedBy: client.config.hostedBy ? interaction.user : null,
            messages
        });
    
        interaction.reply(`Çekiliş [${giveawayChannel}] kanalında başlatıldı.`);
    
    } 

};
