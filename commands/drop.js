const Discord = require('discord.js');
const messages = require("../utils/messages");

module.exports = {
    description: 'Drop atarsınız.',
    options: [
        {
            name: 'kazanan-sayısı',
            description: 'Kaç kişinin kazanacağını belirtin.',
            type: Discord.ApplicationCommandOptionType.Integer,
            required: true
        },
        {
            name: 'ödül',
            description: 'Verilecek drop ödülünü belirtin.',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'kanal',
            description: 'Drobun atılacağı kanalı belirtin.',
            type: Discord.ApplicationCommandOptionType.Channel,
            required: true
        }
    ],

    run: async (client, interaction) => {

        if(!interaction.member.permissions.has('ADMINISTRATOR') && !interaction.member.roles.cache.some((r) => r.name === "Çekiliş görevlisi")){
            return interaction.reply({
                content: 'Drop atabilmek için \`Yönetici\` yetkisine veya \`Çekiliş görevlisi\` rolüne sahip olmalısın.',
                ephemeral: true
            });
        }
    
        const giveawayChannel = interaction.options.getChannel('kanal');
        const giveawayWinnerCount = interaction.options.getInteger('kazanan-sayısı');
        const giveawayPrize = interaction.options.getString('ödül');
    
        if(!giveawayChannel.isTextBased()) {
            return interaction.reply({
                content: 'Drobu yalnızca yazı kanallarına atabilirsin.',
                ephemeral: true
            });
        }

        client.giveawaysManager.start(giveawayChannel, {
            winnerCount: giveawayWinnerCount,
            prize: giveawayPrize,
            hostedBy: client.config.hostedBy ? interaction.user : null,
            isDrop: true,
            messages
        });
    
        interaction.reply(`Drop [${giveawayChannel}] kanalına atıldı.`);

    }
};
