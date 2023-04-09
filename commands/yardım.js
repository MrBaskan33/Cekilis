const { Discord, EmbedBuilder } = require('discord.js');

module.exports = {
    description: 'Yardım menüsünü gösterir.',
    
    run: async (client, interaction) => {

      const Yardım = new EmbedBuilder()
         .setColor("Blurple")
         .setTitle("Çekiliş • Yardım menüsü")
         .setDescription(`
</çekiliş-başlat:0>

</yeniden-çek:0>

</çekiliş-bitir:0>

</çekiliş-durdur:0>

</çekiliş-devam:0>

</çekiliş-düzenle:0>

</çekilişler:0> 

</drop:0>
`)
      
      interaction.reply({embeds: [Yardım]})
      
      
 }
}