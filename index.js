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
  if (old_mess.content.startsWith('https://')) return;
  client.channels.get('451753898458349568').send({embed: {
    author: {
      name: new_mess.author.username+' ('+new_mess.author.username+'#'+new_mess.author.discriminator+')',
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
      name: del_mess.author.username+' ('+del_mess.author.username+'#'+del_mess.author.discriminator+')',
      icon_url: del_mess.author.avatarURL
    },
      color: 3447003,

      fields: [{
        name: 'Сообщение удалено:',
        value: '``` '+del_mess.content+' ```'
      },
    ],

      timestamp: new Date(),
      footer: {
        text: 'in channel #'+del_mess.channel.name
      }
    }

  });}
});

client.on("guildMemberAdd", (member) => {
  client.channels.get('451753898458349568').send({embed: {
    author: {
      name: member.user.username+' ('+member.user.username+'#'+member.user.discriminator+')',
      icon_url: member.user.avatarURL
    },
      color: 0x00ff00,

      timestamp: new Date(),
      footer: {
        text: 'User joined'
      }
    }

  });
});

client.on("guildMemberRemove", (member) => {
  client.channels.get('451753898458349568').send({embed: {
    author: {
      name: member.user.username+' ('+member.user.username+'#'+member.user.discriminator+')',
      icon_url: member.user.avatarURL
    },
      color: 0xff0000,

      timestamp: new Date(),
      footer: {
        text: 'User left'
      }
    }

  });
});

function serverInfo(message){

  if(message.guild.region === 'russia'){
    var reg = 'Россия'} else {reg = message.guild.region};
  if(message.guild.verificationLevel == '0'){
    var vr = 'Нету'} else {vr = message.guild.verificationLevel};

  return embed = new Discord.RichEmbed()

  .setAuthor(message.guild.name, message.guild.iconURL)
  .setDescription("ID:"+message.guild.id)
  .setColor(0x00AE86)
 
  .setFooter("© SevenTrio", "")
 
  .setThumbnail(message.guild.iconURL)
  
  .setTimestamp()

  .addField("Уровень проверки", vr, true)
  .addField("Регион", reg, true)
  .addField("Участники",'Всего:      `'+message.guild.memberCount+'`\nОнлайн:  `'+message.guild.members.filter(m => m.presence.status !== 'offline').size+'`', true)
  .addField(`Каналы [${message.guild.channels.size}]`,'Текстовых:  `'+message.guild.channels.filter(guildchannel => {if(guildchannel.type == "text") return guildchannel}).size+'`\nГолосовых:  `'+message.guild.channels.filter(guildchannel => {if(guildchannel.type == "voice") return guildchannel}).size+'`', true )
  .addBlankField(true)
  .addField("Создатель:", message.guild.owner.user.username +'#'+message.guild.owner.user.discriminator+' ('+message.guild.owner.id+')')
  .addField("Дата создания:", message.guild.createdAt)
  .addField("Роли:", message.guild.roles.size);
};

client.on('message', (message) => {

  if(message.channel.id === '425082092838453249' && message.author.id !== "218719595618500608"){
    message.react('425506799408513024');
    message.react('425506818601517066');};

  if(message.author.bot) return;
  if(message.content.indexOf(prefix) !== 0) return;
  
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === "ping") {
    message.channel.send('Pong! Your ping is `' + `${Date.now() - message.createdTimestamp}` + ' ms`');
  }

  if(command === "serverinfo"){
  message.channel.send(serverInfo(message));
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
                value: '**__'+prefix+'ping\n'+prefix+'avatar\n'+prefix+'penis\n'+prefix+'serverinfo__** *(эксперементально)*\n...\nIn developing!\n...'
              },
              {
                name: "Мой сервер:",
                value: "**Заходи, здесь весело - [Орден Геймеров](https://discord.gg/FTgCAj6)!**"
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
    
   // if(command === '18+'){
   //  message.guild.member.roles.has('452500116633550878');
   //  message.channel.send('bad boy');
   // }

    if(command === 'penis'){
      var sNumber = '',
      y = 0,
      x = [];
      let member = message.mentions.members.first();
      
      if (!member){
      sNumber = message.author.id
      } else {
      sNumber = member.user.id};
      
      if (sNumber !== '218562543185035266'){
      for (var i = 0, len = sNumber.length; i < len; i += 1) {
      x.push(+sNumber.charAt(i));};
    
      for (var i = 0, sum = 0; i < x.length; sum += x[i++]);  
      y = sum % 69;}
      else{
      y = 3
      };
      message.channel.send('8'+'='.repeat(y)+'D');
    };

});
client.login(process.env.BOT_TOKEN).catch(console.error);
process.env.BOT_TOKEN = process.env.POSLANIYE;
