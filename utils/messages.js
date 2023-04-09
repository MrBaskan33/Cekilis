const config = require('../config.json');

module.exports = {
    giveaway: (config.everyoneMention ? "@everyone\n\n" : "")+"**Çekiliş devam ediyor.**",
    giveawayEnded: (config.everyoneMention ? "@everyone\n\n" : "")+"**Çekiliş sona erdi.**",
    title: '{this.prize}',
    inviteToParticipate: '• 🎉 emojisine tıklayarak çekilişe katılabilirsiniz.',
    winMessage: 'Tebrikler {winners}, [\`{this.prize}\`] ödülünü kazandın.',
    drawing: '• Çekilişin bitmesine kalan: {timestamp}',
    dropMessage: '• 🎉 emojisine ilk basan drobu alır.',
    embedFooter: '{this.winnerCount} kazanan(lar)',
    noWinner: '• Çekilişe katılan olmadığı için iptal edildi.',
    winners: '• Kazanan(lar):',
    endedAt: 'Çekiliş bitti',
    hostedBy: '• Çekilişi başlatan: {this.hostedBy}'
};
