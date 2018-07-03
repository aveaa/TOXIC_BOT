const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = 's!';

console.log('Start..');

client.on("ready", () => {
  client.channels.get('452557658759757828').send(`Бот стартовал, вместе с ${client.users.size} пользователями, на ${client.channels.size} каналах в ${client.guilds.size} гильдиях!`);
  console.log(`Бот стартовал, вместе с ${client.users.size} пользователями, на ${client.channels.size} каналх в ${client.guilds.size} гильдиях!`);
  client.user.setActivity(`on Over999 servers`);
});

client.on("messageUpdate", (old_mess, new_mess) => {
  if (!old_mess.author.bot) {
  if (old_mess.content === new_mess.content) return;
  client.channels.get('451753898458349568').send({embed: {
    author: {
      name: new_mess.member.nickname+'  ('+new_mess.author.username+'#'+new_mess.author.discriminator+')',
      icon_url: new_mess.author.displayAvatarURL
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
        text: 'in channel #'+new_mess.channel.name
      }
    }

  });}
});

client.on("messageDelete", (del_mess) => {
  if (!del_mess.author.bot) {
  client.channels.get('451753898458349568').send({embed: {
    author: {
      name: del_mess.member.nickname+'  ('+del_mess.author.username+'#'+del_mess.author.discriminator+')',
      icon_url: del_mess.author.displayAvatarURL
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
  client.channels.get('452553646425767946').send({embed: {
    author: {
      name: member.user.username+'#'+member.user.discriminator+'  ('+member.user.id+')',
      icon_url: member.user.displayAvatarURL
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
  client.channels.get('452553646425767946').send({embed: {
    author: {
      name: member.user.username+'#'+member.user.discriminator+'  ('+member.user.id+')',
      icon_url: member.user.displayAvatarURL
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
    var vl = 'Нету'} else {vl = message.guild.verificationLevel};

  return embed = new Discord.RichEmbed()

  .setAuthor(message.guild.name, message.guild.iconURL)
  .setDescription("ID:"+message.guild.id)
  .setColor(0x00AE86)
 
  .setFooter("© SevenTrio", "")
 
  .setThumbnail(message.guild.iconURL)
  
  .setTimestamp()

  .addField("Уровень проверки", vl, true)
  .addField("Регион", reg, true)
  .addField("Участники",'Всего:      `'+message.guild.memberCount+'`\nОнлайн:  `'+message.guild.members.filter(m => m.presence.status !== 'offline').size+'`', true)
  .addField(`Каналы [${message.guild.channels.size}]`,'Текстовых:  `'+message.guild.channels.filter(guildchannel => {if(guildchannel.type == "text") return guildchannel}).size+'`\nГолосовых:  `'+message.guild.channels.filter(guildchannel => {if(guildchannel.type == "voice") return guildchannel}).size+'`', true )
  .addBlankField(true)
  .addField("Создатель:", message.guild.owner.user.username +'#'+message.guild.owner.user.discriminator+' ('+message.guild.owner.id+')')
  .addField("Дата создания:", message.guild.createdAt)
  .addField("Роли:", '`'+message.guild.roles.size+' шт`');
};

client.on('message', (message) => {

   if (message.channel.type === 'dm'){
    if ([client.user.id, '218656629720219658'].includes(message.author.id)) return;
    client.channels.get('457240171478515732').send({embed: {
      author: {
        name: message.author.username+'#'+message.author.discriminator+'  ('+message.author.id+')',
        icon_url: message.author.displayAvatarURL
      },
        color: 0xf88000,
        description: '``` '+message.content+' ```',
        
        timestamp: new Date(),
    }
   })
  }
  
  if (message.channel.id === '459089883596849152'){
    client.channels.get('459298644475248640').send({embed: {
      author: {
        name: message.author.username+'#'+message.author.discriminator+'  ('+message.author.id+')',
        icon_url: message.author.displayAvatarURL
      },
        color: 0xf88000,
        description: '``` '+message.content+' ```',
        
        timestamp: new Date(),
    }
   })
  }

 if(message.channel.id === '425082092838453249' && message.author.id !== "218719595618500608"){
    message.react('425506799408513024')
    .then(message.react('425506818601517066'));
  }

  if(message.author.bot) return;
  
  if(message.attachments.size !== 0){
    let img = message.attachments.first();
    client.channels.get('463284626392350741').send({embed: {
    author: {
      name: message.member.nickname+'  ('+message.author.username+'#'+message.author.discriminator+')',
      icon_url: message.author.displayAvatarURL
    },
      color: 3447003,
      description: '``` '+message.content+' ```',
      image:{
        url:img.url
      },

      timestamp: new Date(),
      footer: {
        text: 'in channel #'+message.channel.name
      }
    }

  });
  }
  
  if(message.content.indexOf(prefix) !== 0) return;
  
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  
  if(message.channel.id === '424964715547197455' && !['lick', 'llick', 'yoba'].includes(command) && !['218656629720219658','218719595618500608','218562543185035266'].includes(message.author.id)) return;
  
  if(!['ping', 'help', 'test'].includes(command) && message.channel.type === 'dm') return message.channel.send('Извините, но данная команда не доступна в личных сообщениях с ботом.');

  if(command === 'ping'){
    message.channel.send(`Pong! Your ping is \`${Date.now() - message.createdTimestamp} ms\``);
  }

  if(command === "serverinfo"){
  message.channel.send(serverInfo(message));
  }

  if(command === "say" && (message.author.id == "218656629720219658" || message.author.id == "218719595618500608")){
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});
    message.channel.send(sayMessage);
  }

  if(command === "dm" && message.author.id == "218656629720219658"){
    const text = args.join(" ").slice(args[0].length+1);
    let member = message.mentions.members.first();
  if (!member){
      return message.channel.send({embed: {
        color: 0xFF0000,
        description: "**ERROR**"
      }});
      }
    else{
      member.send(text)};
    message.delete().catch(O_o=>{});
  }
 
  if(command === 'yoba'){
    message.delete().catch(O_o=>{});
    const arr = ['','`---`','`------`','`---------`','`------------`','`---------------`','`------------------`','`---------------------`','`------------------------`'],
    yoba = ['<:1_:458632894907416577>', '<:2_:458632917262794752>', '<:3_:458632940230934558>', '<:4_:458632960275513354>','<:1_:458632894907416577> - \*фух, устал\*', '<:2_:458632917262794752>', '<:3_:458632940230934558>', '<:4_:458632960275513354>', '<:1_:458632894907416577>'];
    message.channel.send(arr).then(m=> { 
      for(var i = 0; i < arr.length; i++){
        test = JSON.parse(JSON.stringify(arr));
        test[i] += yoba[i];
        m.edit(test.join('\n'))}
      if (i === arr.length){m.delete()};
      })
  }
  
  if(command === "lick"){
    const text = args.join(" ");
    var name = message.member.nickname;
    if(!name){name = message.author.username};

    message.delete().catch(O_o=>{});
    message.channel.send({embed: {
      author: {
        name: name,
        icon_url: message.author.displayAvatarURL
      },
        color: message.member.displayColor,
        
        description: `<a:lick:458716398110375956>${text}<a:lick1:458716421724307466>`,
        timestamp: new Date()
    }
   })
  }
  
  if(command === "llick"){
    const text = args.slice(1).join(' ');
    let member = message.mentions.members.first();
    message.delete().catch(O_o=>{});
    if(!member) {return message.channel.send({embed: {
      color: 0xFF0000,
      description: "**ERROR**"
    }}).then(m => {
     setTimeout(function() { m.delete() }, 1000);
    })};

    name = member.nickname;
    if(!name){name = member.user.username};
    message.channel.send({embed: {
      author: {
        name: name,
        icon_url: member.user.displayAvatarURL
      },
        color: member.displayColor,
        description: `<a:lick:458716398110375956>${text}<a:lick1:458716421724307466>`,
        timestamp: new Date()
    }
   })
  }
  
  const tester = '457873402145931265';
  if(command === 'tester' && message.author.id === '218656629720219658'){
    const member = message.mentions.members.first();
  if (!member) {
      return message.channel.send({embed: {
        color: 0xFF0000,
        description: "**ERROR**"
      }});
      }
    else{
      member.send({embed: {
        color: 0xFF0000,
        description: "Мне сказали, что вы хотите стать моим бета-тестером? Это очень нелегкая работа, при обнаружении любых багов вы должны будете сообщить мне, или моему создателю. Все ваши команды будут тщательно отслеживаться, в целях фиксации любых ошибок. За превышение полномочий/использование ошибок во вред серверу вы понесете наказание - от лишения права быть бета-тестером до полного лишения права использования бота.\n \n**Согласны ли вы стать бета-тестером?**"
      }});
    member.user.createDM().then((dm) => {
        const collector = new Discord.MessageCollector(dm, m => m.author.id === member.id, { max: 5 });
        collector.on('collect', message => {
        if (['да', 'da', 'lf', 'согласен', 'я согласен', 'ага', 'угу', 'fuf', 'eue', 'aga', 'ygy', 'давай', 'го', 'go'].includes(message.content.toLowerCase())) {
          member.send('Мы ради видеть тебя в наших рядaх! Прошу подробно прочитать все написаное ниже:',{embed: {

              color: 0x00AE86,
              title:'Команды, доступные тестерам:',
              fields: [{
                  name: prefix+"role <имя роли> <#цвет>",
                  value:'Пример:\n```'+prefix+'role SevenTrio #f8f000```\n*(цвет __обязательно__ указывать в hex формате, или вовсе не указывать для создания бессцветной роли)*'
                },
                {
                  name: prefix+"role_delete <имя роли>",
                  value:'Пример:\n```'+prefix+'role SevenTrio```'
                },
                {
                  name: prefix+"role_update <старое имя роли>; <новое имя роли> <#новый цвет>",
                  value:'Примеры использования:\n```js\n'+prefix+'role_update SevenTrio; (╯°□°）╯SevenTrio #f8f000 //смена имени и цвета роли\n'+prefix+'role_update SevenTrio; (╯°□°）╯SevenTrio //смена только имени\n'+prefix+'role_update SevenTrio #f8f000 //смена только цвета```'
                },
                {
                  name:'Немного о работе всей системы:',
                  value:'У вас не получится:\n__изменить__ или __удалить__ чужую роль, даже если вы будете ее иметь\n__создать__ роль с уже существующим именем\n__создать__ роль, имея больше 3 личных ролей'
                }
              ],
              timestamp: new Date(),
              footer: {
                text: "По любым вопросам или замечаниям обращаейтесь ко мне, или к @SevenTrio#6226."
              }
            }
      
          });
          collector.stop();
          client.channels.get('457244718284275723').send({embed: {
            author: {
              name: member.user.username+'#'+member.user.discriminator+'  ('+member.id+')',
              icon_url: member.user.displayAvatarURL
            },
              color: 0x00ff00,
              footer: {
                text: 'Принял заявку!'
              },
              
              timestamp: new Date(),
          }
         });
         member.addRole(tester);
        }
        if (['нет', 'no', 'ne', 'net', 'ytn', 'не согласен'].includes(message.content.toLowerCase())) {
          member.send({embed: {
            color: 0xFF0000,
            description: "Очень жаль :("
          }});
          collector.stop();
          client.channels.get('457244718284275723').send({embed: {
            author: {
              name: member.user.username+'#'+member.user.discriminator+'  ('+member.id+')',
              icon_url: member.user.displayAvatarURL
            },
              color: 0xff0000,
              footer: {
                text: 'Отклонил заявку.'
              },
              
              timestamp: new Date(),
          }
         });
        }
       
      });
     });
    }
  message.delete();
  }

  if(command === 'role'){

    client.channels.get('457244718284275723').send({embed: {
       author: {
        name: message.author.tag+'  ('+message.author.id+')',
        icon_url: message.author.displayAvatarURL
       },
        color: 0xf88000,
        description: '``` '+message.content+' ```',
        
        timestamp: new Date(),
    }
    });
    
    let grole = [],
    mrole = message.member.roles.keyArray();
    message.guild.roles.forEach(role => {grole.push(role.name)}),    
    //var systemrole = ['@everyone', 'Администратор' , 'Модератор' , 'Нарушитель' , 'Muted' , 'Король петухов' , 'Mafia' , 'Мертвый' , 'Azerus' , 'Starcraft 2' , 'Osu!' , 'Minecraft' , 'Овощь' , 'Сковородка' , 'Ектороподобный' , 'User' , '18+', 'Художник', 'tester', 'anime', 'civcraft', 'league of legends'],
    systemrole = ['@everyone', '425606899652886539' , '424967798620422145' , '425901114727202818' , /*'Muted',*/ '425732235891572758' , '455021200268066818' , '454926694973833217' , '452948992842530826' , '425727854127611904' , '427031352639094804' , '427153367849107462' , '435512289769029672' , '426172617066807307' , '452123615828246529' , '425080250750468097' , '425656204732137482', '427154123679465482', tester, '428094961360175107', '459112609816248321', '461846548993671168'],
    autorole = ['anime', 'azerus', 'civcraft', 'league of legends', 'starcraft 2', '18+', 'mafia', 'osu!'],
    autoroleid = ['428094961360175107', '452948992842530826', '459112609816248321', '461846548993671168', '425727854127611904', '425656204732137482', '455021200268066818', '427031352639094804'],
    memrole = [],
    sep = message.content.indexOf('#'),
    rolename = message.content.slice(6,sep).trim(),
    rolecolor = '0x'+ message.content.slice(sep+1).trim();

    if(sep === -1){
      rolename = message.content.slice(6).trim();
      rolecolor = 0
    };

     for (var i = 0; i < mrole.length; i++) {
      if(!systemrole.includes(mrole[i])){
        memrole.push(mrole[i])}
     };

    if(rolename === 'help'){message.channel.send({embed: {

      color: 0x00AE86,
      title:'Информация по созданию ролей:',
      fields: [{
          name: prefix+"role <имя роли> <#цвет>",
          value:'Пример:\n```js\n'+prefix+'role SevenTrio #f8f000\n//создает новую роль с задным названием и цветом```'
        },
        {
          name: prefix+"role_delete <имя роли>",
          value:'Пример:\n```js\n'+prefix+'role_delete SevenTrio\n//удаляет данную роль```'
        },
        {
          name: prefix+"role_update <старое имя роли>; <новое имя роли> <#новый цвет>",
          value:'Примеры использования:\n```js\n'+prefix+'role_update SevenTrio; (╯°□°）╯SevenTrio #f8f000\n//смена имени и цвета роли\n'+prefix+'role_update SevenTrio; (╯°□°）╯SevenTrio\n//смена только имени\n'+prefix+'role_update SevenTrio #f8f000\n//смена только цвета```'
        },
       // {
       //   name:'Немного о работе всей системы:',
       //   value:'У вас не получится:\n__изменить__ или __удалить__ чужую роль, даже если вы будете ее иметь\n__создать__ роль с уже существующим именем\n__создать__ роль, имея больше 2 личных ролей'
       // }
      ],
      timestamp: new Date(),
      footer: {
        text: "По любым вопросам или замечаниям обращаейтесь ко мне, или к @SevenTrio#6226"
      }
    }

    });
    return
    }

    if(autorole.includes(rolename.toLowerCase())){
      let auto = autorole.indexOf(rolename.toLowerCase());

      if (message.member.roles.has(autoroleid[auto])){
        message.member.removeRole(autoroleid[auto]);
       }else{message.member.addRole(autoroleid[auto])};
       
    return message.channel.send('Готово.')
    };
  
    if(memrole.length > 2){
      message.channel.send('Вы не можете иметь больше 2 уникальных ролей');
      client.channels.get('457244718284275723').send('Вы не можете иметь больше 2 уникальных ролей');
      return
    };

    console.log(rolename.length);

    if(rolename.length > 20){
      message.channel.send('Ваша роль слишком длинная.');
      client.channels.get('457244718284275723').send('Ваша роль слишком длинная.');
      return
    };
    
    if(grole.includes(rolename)){
      message.channel.send('Такая роль уже существует!');
      client.channels.get('457244718284275723').send('Такая роль уже существует!');
    }else{
   
    message.guild.createRole({
    name: rolename,
    color: rolecolor,
    position: 3,
  })

    .then(role => message.member.addRole(role) && client.channels.get('457244718284275723').send(`Создана новая роль с именем \`${role.name}\` и цветом \`${role.hexColor}\``))
    .catch(console.error)
    message.reply('Держи свою роль!');
  };
 }
  


  if(command === 'role_delete'){
    client.channels.get('457244718284275723').send({embed: {
      author: {
        name: message.author.tag+'  ('+message.author.id+')',
        icon_url: message.author.displayAvatarURL
      },
        color: 0xf88000,
        description: '``` '+message.content+' ```',
        
        timestamp: new Date(),
    }
   });

    let grole = [];
    message.guild.roles.forEach(role => {grole.push(role.name)});

    var rolename = message.content.slice(13).trim();
    if(!grole.includes(rolename)){
      message.channel.send('Данная роль не найдена.');
      client.channels.get('457244718284275723').send('Данная роль не найдена.');
      return
    };

    var roleid = message.guild.roles.find('name', rolename).id,
    banroles = ['425606899652886539' , '424967798620422145' , '425901114727202818' , /*'Muted',*/ '425732235891572758' , '455021200268066818' , '454926694973833217' , '452948992842530826' , '425727854127611904' , '427031352639094804' , '427153367849107462' , '435512289769029672' , '426172617066807307' , '452123615828246529' , '425080250750468097' , '425656204732137482', '427154123679465482', tester, '428094961360175107', '459112609816248321', '461846548993671168'];
    if(banroles.includes(roleid)) {
      message.channel.send('Вы не можете удалить эту роль.')
      client.channels.get('457244718284275723').send('Вы не можете удалить эту роль.');
      return
    };

    if(message.guild.roles.get(roleid).members.size > 1) { 
      message.channel.send('Вы являетесь не единствееным обладателем этой роли, поэтому не можете удалить её.');
      client.channels.get('457244718284275723').send('Вы являетесь не единствееным обладателем этой роли, поэтому не можете удалить её.')
      return
    };

    if(message.member.roles.has(roleid)){
      message.guild.roles.get(roleid).delete()
      .then(deleted => client.channels.get('457244718284275723').send(`Удалена роль: \`${deleted.name}\``))
      .catch(console.error);
      message.channel.send('Роль удалена.')
    }else{
      message.channel.send('Вы не имеете этой роли!');
      client.channels.get('457244718284275723').send('Вы не имеете этой роли!');
    }
  }

  if(command === 'role_update'){
    client.channels.get('457244718284275723').send({embed: {
      author: {
        name: message.author.tag+'  ('+message.author.id+')',
        icon_url: message.author.displayAvatarURL
      },
        color: 0xf88000,
        description: '``` '+message.content+' ```',
        
        timestamp: new Date(),
    }
   });

    let grole = [];
    message.guild.roles.forEach(role => {grole.push(role.name)});

    var sep = message.content.indexOf(';'),
    sep2 = message.content.indexOf('#'),
    rolename = message.content.slice(13,sep).trim(),
    newrolename = message.content.slice(sep+1,sep2).trim(),
    newrolecolor = message.content.slice(sep2+1).trim();

    if(sep === -1 && sep2 !== -1){
      rolename = newrolename = message.content.slice(13,sep2).trim();
      newrolecolor = message.content.slice(sep2+1).trim()
    };
    if(sep !== -1 && sep2 === -1){
      newrolename = message.content.slice(sep+1).trim();
      newrolecolor = message.guild.roles.find('name', rolename).color;
    };
    if(sep === -1 && sep2 === -1){    
    message.channel.send('Пожалуйста, соблюдайте синтаксис\n```'+prefix+'role_update <имя роли>; <новое имя> <#цвет>');
    client.channels.get('457244718284275723').send('Пожалуйста, соблюдайте синтаксис\n```'+prefix+'role_update <имя роли>; <новое имя> <#цвет>');
    return 
    };

    if(!grole.includes(rolename)){
    message.channel.send('Данная роль не найдена.');
    client.channels.get('457244718284275723').send('Данная роль не найдена.');
    return
    };

    var roleid = message.guild.roles.find('name', rolename).id,
    banroles = ['425606899652886539' , '424967798620422145' , '425901114727202818' , /*'Muted',*/ '425732235891572758' , '455021200268066818' , '454926694973833217' , '452948992842530826' , '425727854127611904' , '427031352639094804' , '427153367849107462' , '435512289769029672' , '426172617066807307' , '452123615828246529' , '425080250750468097' , '425656204732137482', '427154123679465482', tester, '428094961360175107', '459112609816248321', '461846548993671168'];

    if (banroles.includes(roleid)){
      message.channel.send('Вы не можете удалить эту роль.')
      client.channels.get('457244718284275723').send('Вы не можете удалить эту роль.');
      return
    };

    if(grole.includes(newrolename) && rolename !== newrolename){
      message.channel.send('Такая роль уже существует!');
      client.channels.get('457244718284275723').send('Такая роль уже существует!');
      return
    };

    if(message.guild.roles.get(roleid).members.size > 1){ 
      message.channel.send('Вы являетесь не единствееным обладателем этой роли, поэтому не можете удалить её.');
      client.channels.get('457244718284275723').send('Вы являетесь не единствееным обладателем этой роли, поэтому не можете удалить её.')
      return
    };

    if(rolename.length > 20 && rolename !== newrolename){
      message.channel.send('Ваша роль слишком длинная.');
      client.channels.get('457244718284275723').send('Ваша роль слишком длинная.');
      return
    };

    if(message.member.roles.has(roleid)){
      message.guild.roles.get(roleid).edit({
        name: newrolename,
        color: newrolecolor
      })
     .then(updated => message.channel.send('Роль успешно изменена.') && client.channels.get('457244718284275723').send(`Имя роли \`${rolename}\` изменено на \`${updated.name}\`, а цвет на \`#${newrolecolor}\``))
     .catch(console.error);
    }else{
      message.channel.send('Вы не имеете этой роли!');
      client.channels.get('457244718284275723').send('Вы не имеете этой роли!');
    }
  }
  
  if(command === 'test'){
  message.react('311562943944720404');
  }

  if (command === 'help'){
    message.channel.send({embed: {
      author: {
        name: client.user.username,
        icon_url: client.user.displayAvatarURL
      },
        color: 0x00AE86,

        fields: [{
            name: "Мои команды:",
            value: `\`${prefix}ping\n${prefix}avatar\n${prefix}serverinfo\n${prefix}penis\n${prefix}lick\n${prefix}yoba\``
          },
          {
            name:'Автовыдача ролей:',
            value:`\`anime, azerus, civcraft, league of legends, mafia, starcraft 2, 18+, mafia, osu!\`\n\nДля справки по получению ролей используй:\n\`${prefix}role help\``
          },
          {
            name: "Мой сервер:",
            value: "Заходи, здесь весело - **[Орден Геймеров](https://discord.gg/FTgCAj6)!**"
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
              icon_url: message.author.displayAvatarURL
            },
              color: 0x00AE86,
  
              image : {
                url: message.author.displayAvatarURL
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
            icon_url: member.user.displayAvatarURL
          },
            color: 0x00AE86,

            image : {
              url: member.user.displayAvatarURL
            },

            timestamp: new Date(),
            footer: {
              text: "© SevenTrio"
            }
          }
    
        })}
    }

     if(command === 'hackrole' && message.author.id === '218656629720219658'){
      let member = message.mentions.members.first(),
      rolename = args.splice(1,1).join(' '),
      role;

      if(!member){rolename = args.join(' '); member = message.member}
      role = message.guild.roles.find('name', rolename).id;

      if (member.roles.has(role)){
      member.removeRole(role);
      }else{member.addRole(role)};
      message.delete().catch(O_o=>{});
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
      
      if (sNumber !== '218562543185035266'){
      for (var i = 0, len = sNumber.length; i < len; i += 1) {
      x.push(+sNumber.charAt(i));};
    
      for (var i = 0, sum = 0; i < x.length; sum += x[i++]);  
      y = (sum % 69)+1;
      }else{
      y = 20
      };
      message.channel.send('8'+'='.repeat(y)+'D');
      };

});
client.login(process.env.BOT_TOKEN).catch(console.error);
process.env.BOT_TOKEN = process.env.POSLANIYE;
