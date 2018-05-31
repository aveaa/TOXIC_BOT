const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = 's!';

console.log('Start..');

client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setActivity(`on Over999 servers`);
});

client.on("messageUpdate", (old_mess, new_mess) => {
  if (!old_mess.author.bot) {
  client.channels.get('451753898458349568').send({embed: {
    author: {
      name: new_mess.author.username,
      icon_url: new_mess.author.avatarURL
    },
      color: 3447003,

      fields: [{
        name: 'До изменения:',
        value: '```'+old_mess.content+'```'
      },
      {
        name: "После изменения:",
        value: '```'+new_mess.content+'```'
      }
    ],

      timestamp: new Date(),
      footer: {
        text: 'in channel '+new_mess.channel.name
      }
    }

  });}
});

client.on("messageDelete", (del_mess) => {
  if (!del_mess.author.bot) {
  client.channels.get('451753898458349568').send({embed: {
    author: {
      name: del_mess.author.username,
      icon_url: del_mess.author.avatarURL
    },
      color: 3447003,

      fields: [{
        name: 'Сообщение удалено:',
        value: '```'+del_mess.content+'```'
      },
    ],

      timestamp: new Date(),
      footer: {
        text: 'in channel '+del_mess.channel.name
      }
    }

  });}
});

client.on('message', (message) => {

  if(message.author.bot) return;
  if(message.content.indexOf(prefix) !== 0) return;
  
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === "ping") {
    message.channel.send('Pong! Your ping is `' + `${Date.now() - message.createdTimestamp}` + ' ms`');
  }

  if(command === "say" && (message.author.id == "218656629720219658" || message.author.id == "218719595618500608")) {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});
    message.channel.send(sayMessage);
  }

  if (command === 'help'){
        message.channel.send({embed: {
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL
          },
            color: 3447003,

            fields: [{
                name: "Мои комады:",
                value: '**__'+prefix+'ping\n'+prefix+'avatar\n'+prefix+'penis__**\n...\nIn developing!\n...'
              },
              {
                name: "Мой сервер:",
                value: "**Заходи, здесь весело - [Орден Геймеров](https://discord.gg/tkFKQTN)!**"
              }
            ],
            timestamp: new Date(),
            footer: {
              text: "© SevenTrio"
            }
          }
    
        });
    }

    if (command === "avatar") {
      let member = message.mentions.members.first();
      if (!member) {
          return message.reply('держи свою аву!', {embed: {
            author: {
              name: message.author.username,
              icon_url: message.author.avatarURL
            },
              color: 3447003,
  
              image : {
                url: message.author.avatarURL,
              },
  
              timestamp: new Date(),
              footer: {
                text: "© SevenTrio"
              }
            }
      
          })}else{
      
        message.reply('получите, распишитесь!', {embed: {
          author: {
            name: member.user.username,
            icon_url: member.user.avatarURL
          },
            color: 3447003,

            image : {
              url: member.user.avatarURL,
            },

            timestamp: new Date(),
            footer: {
              text: "© SevenTrio"
            }
          }
    
        })}
    }
    
    if(command === 'penis'){
      var sNumber = '',
      y = 0,
      x = [];
      let member = message.mentions.members.first();
      
      if (!member){
      sNumber = message.author.id
      } else {
      sNumber = member.user.id};
      
      for (var i = 0, len = sNumber.length; i < len; i += 1) {
      x.push(+sNumber.charAt(i));
    };
    
      for (var i = 0, sum = 0; i < x.length; sum += x[i++]);  
      y = sum % 27;
      message.channel.send('8'+'='.repeat(y)+'D');
    };

});
client.login(process.env.BOT_TOKEN).catch(console.error);
process.env.BOT_TOKEN = process.env.POSLANIYE;
