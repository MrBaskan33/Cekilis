const Discord = require('discord.js');

module.exports = {
    description: 'Çekilişi yeniden çekersiniz.',
    options: [
        {
            name: 'çekiliş',
            description: 'Yeniden çekilecek çekilişin mesaj ID\'sini belirtin.',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        }
    ],
    
    run: async (client, interaction) => {

        if(!interaction.member.permissions.has('ADMINISTRATOR') && !interaction.member.roles.cache.some((r) => r.name === "Çekiliş görevlisi")){
            return interaction.reply({
                content: 'Çekilişi yeniden çekmek için \`Yönetici\` yetkisine veya \`Çekiliş görevlisi\` rolüne sahip olmalısın.',
                ephemeral: true
            });
        }

        const query = interaction.options.getString('çekiliş');

        const giveaway = 
            client.giveawaysManager.giveaways.find((g) => g.prize === query && g.guildId === interaction.guild.id) ||
            client.giveawaysManager.giveaways.find((g) => g.messageId === query && g.guildId === interaction.guild.id);

        if (!giveaway) {
            return interaction.reply({
                content: '[`' + query + '`] ID\'li bir çekiliş bulunmuyor.',
                ephemeral: true
            });
        }

        if (!giveaway.ended) {
            return interaction.reply({
                content: 'Yeniden çekmeye çalıştığın çekiliş henüz bitmemiş.',
                ephemeral: true
            });
        }

        client.giveawaysManager.reroll(giveaway.messageId)
        .then(() => {
           interaction.reply('Çekiliş yeniden çekildi.');
          })
                .catch((e) => {
            interaction.reply({
                content: e,
                ephemeral: true
            });
        });

    }
};
