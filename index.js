const Discord = require('discord.js');
const client = new Discord.Client();
const {token, channelID} = require('./config.json')

client.on('ready', () => {
    console.log(client.user.username + " has been started");
})

client.on('message', async (message) => {
    let guildmessage = message;
    if (message.content == "!aideserv") {

        await message.delete()
        message.channel.send("Veuillez regardez vos messages privé").then(msg => {
            msg.delete({timeout: 10000})
        })
        message.author.send("Veuillez saisir un type de recherche").then(msg => {

            const filter = m => m.content;


            msg.channel.awaitMessages(filter, {max: 1, time: 60000, errors: ['time']}).then(collected => {
                let searchType = collected.first().content;

                message.author.send("Veuillez saisir une description").then(msg => {

                    const filter = m => m.content;


                    msg.channel.awaitMessages(filter, {max: 1, time: 60000, errors: ['time']}).then(collected => {
                        let description = collected.first().content;


                        message.author.send("Veuillez saisir un prix").then(msg => {

                            const filter = m => m.content;


                            msg.channel.awaitMessages(filter, {
                                max: 1,
                                time: 60000,
                                errors: ['time']
                            }).then(collected => {
                                let price = collected.first().content;


                                msg.channel.send("Êtes vous sûr de vouloir envoyez cette annonce ?").then(message => {

                                            message.react('✅').then(() => message.react('❌'));


                                    let filter = (reaction, user) => {
                                            return ['✅', '❌'].includes(reaction.emoji.name) && user.id === guildmessage.author.id;
                                        };

                                        message.awaitReactions(filter, {max: 1, time: 60000, errors: ['time']})
                                            .then(collected => {

                                                const reaction = collected.first();
                                                if (reaction.emoji.name === '✅') {
                                                    message.channel.send('Annonce envoyé');
                                                    const embed = {
                                                        "title": "💈 Nouvelle recherche",
                                                        "description": "\nPersonne à contacter: <@" +guildmessage.author.id+ "> \n\nType de recherche:" + searchType + " \n\nDescription: " + description + " \n\n Rémunération:" + price,
                                                        "color": 11662317
                                                    };
                                                    guildmessage.guild.channels.cache.get(channelID).send({embed})

                                                } else if (reaction.emoji.name === '❌') {
                                                    message.reply('Vous avez annulé.');
                                                }
                                            })
                                    }
                                )


                            })

                        })

                    })

                })


            })

        }).catch(() => {
            message.channel.send("Je n'ai pas pu vous envoyer le message étant donné que vos DM sont fermés, activer les, puis réessayer à nouveau")
        })

    }


})


client.login(token)
