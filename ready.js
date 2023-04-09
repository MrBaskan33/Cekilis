module.exports = (client) => {
  
    console.log(`[${client.user.tag}] adlı bot hazır. • [${client.channels.cache.size}] adet kanala, [${client.guilds.cache.size}] adet sunucuya, [${client.users.cache.size}] adet kullanıcıya hizmet veriyorum.`);
 
    client.user.setActivity(`/yardım`)
};
