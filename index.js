const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.GuildMessageReactions
    ]
});

const config = require('./config.json');
client.config = config;

const synchronizeSlashCommands = require('discord-sync-commands');

const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    default: {
        botsCanWin: false,
        embedColor: "Blurple",
        reaction: "🎉",
        lastChance: {
            enabled: true,
            content: '**Çekilişe katılmak için son şans!**',
            threshold: 60000,
            embedColor: 'Blurple'
        }
    }
});

client.giveawaysManager.on("giveawayReactionAdded", (giveaway, member, reaction) => {
    console.log(`[${member.user.tag}] adlı kullanıcı [${giveaway.messageId}] ID'li kanaldaki çekilişe katıldı.`);
});

client.giveawaysManager.on("giveawayReactionRemoved", (giveaway, member, reaction) => {
    console.log(`[${member.user.tag}] adlı kullanıcı [${giveaway.messageId}] ID'li kanaldaki çekilişten ayrıldı.`);
});

client.giveawaysManager.on("giveawayEnded", (giveaway, winners) => {
    console.log(`[${giveaway.messageId}] ID'li kanaldaki çekiliş sona erdi. Kazanan(lar): [${winners.map((member) => member.user.username).join(', ')}] adlı kullanıcı(lar).`);
});

client.commands = new Discord.Collection();
fs.readdir("./commands/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        client.commands.set(commandName, {
            name: commandName,
            ...props
        });
        console.log(`[${commandName}] adlı komut yüklendi.`);
    });
    synchronizeSlashCommands(client, client.commands.map((c) => ({
        name: c.name,
        description: c.description,
        options: c.options,
        type: Discord.ApplicationCommandType.ChatInput
    })), {
        debug: true,
        guildId: config.guildId
    });
});

fs.readdir("./events/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`[${eventName}] adlı event yüklendi.`);
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(`./events/${file}`)];
    });
});

client.login(process.env.token);