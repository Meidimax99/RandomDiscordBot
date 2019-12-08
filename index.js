const Discord = require('discord.js');
const { prefix, token} = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
    //Use message only for the following switch structure if the defined prefix is the first symbol 
    //of the message
	if (message.toString().substring(0, 1) == prefix) {
        //split the command into partial strings, split at ' '
        //also split the first argument as the command argument
        var args = message.toString().substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);

        switch(cmd) {

            case 'test':
                message.channel.send(`Test with argument "${args[0]}".`);
            break;

            case 'owner':
                message.channel.send(`This Server was created by ${message.guild.owner}`);
            break;

            case 'dm':
                message.author.send('Hello there :)');
            break;

            case 'hellothere':
                    message.channel.send({
                        files: [{
                          attachment: './assets/pictures/grievous.jpg',
                          name: 'grievous.jpg'
                        }]
                      })
                        .then(console.log)
                        .catch(console.error);
            break;

            case 'run':
                var channel = message.member.voiceChannel
                    if(channel) {
                        joinChannel(channel).then(connection => {
                            const dispatcher = connection.playFile('./assets/audio/run.mp3');
                        });
                    }
            break;

            case 'join':
                var currentVoice = message.member.voiceChannelID;
                
                //If the calling user is not in any voicechannel the bot cant join
                if(!currentVoice) {
                    return console.error("The user is not in a channel!");
                }
                var channel = client.channels.get(currentVoice);
                
                joinChannel(channel);

            break;

            case 'leave':
                var currentVoice = message.member.voiceChannelID;
                var channel = client.channels.get(currentVoice);
                channel.leave();
            break;
                
        }
    }
});

client.on('voiceStateUpdate', function (oldMember, newMember){
        if(!oldMember.voiceChannel && newMember.voiceChannel) {
            //Bot is supposed to join the newly arriving Member only if the bot isnt in an other voiceChannel
            //of the same server
            if(!client.voiceConnections.find('VoiceChannel', newMember.voiceChannel)) {
                if(!client.guilds.find('Guild', newMember.guild)) {
                    newMember.voiceChannel.join().then(connection =>{
                        const dispatcher = connection.playFile('./assets/audio/hellothere.mp3');
                        //dispatcher.on('end', end => {
                          //  newMember.voiceChannel.leave();
                        //})
                    }).catch(err => console.log(err));
                }
                
            }
        }
});


client.login(token);