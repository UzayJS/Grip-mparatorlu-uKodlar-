// Discord Butonlu Menü Örneği
// Paketler:discord-buttons
//   -----------------
// Komutlara Atılacak:
const discord = require("discord.js");
exports.run = (client, message, args) => {


    const ilksırabuttons = []
    const ilksıraarray = [{label: "I", id: "bir"}, {label: "II", id: "iki"}, {label: "III", id: "üç"}]
    const ikincisırabuttons = []
    const ikincisıraarray = [{label: "IV", id: "dört"}, { label: "V", id: "beş"}, {label: "VI", id: "altı"}]
    const üçüncüsırabuttons = []
    const üçüncüsıraarray = [{label: "VII", id: "yedi"}, {label: "VIII", id: "sekiz"}, {label: "IX", id: "dokuz"}]


ilksıraarray.forEach(element => {
  const buton = new MessageButton()
    .setStyle("green")
    .setLabel(element.label)
    .setID(element.id)
    ilksırabuttons.push(buton)
})

ikincisıraarray.forEach(element => {
  const buton = new MessageButton()
    .setStyle("green")
    .setLabel(element.label)
    .setID(element.id)
    ikincisırabuttons.push(buton)
})

üçüncüsıraarray.forEach(element => {
  const buton = new MessageButton()
    .setStyle("green")
    .setLabel(element.label)
    .setID(element.id)
   üçüncüsırabuttons.push(buton)
})




    const ilkrow = new MessageActionRow()
    .addComponents(ilksırabuttons)

    const ikincirow = new MessageActionRow()
    .addComponents(ikincisırabuttons)

    const üçüncürow = new MessageActionRow()
    .addComponents(üçüncüsırabuttons)


    message.channel.send(`
    Merhaba ${message.author.tag}, Aşağıdan sunucu içerisi yapmak istediğiniz işlem veya ulaşmak istediğiniz bilgi için gerekli butonlara tıklamanız yeterli olacaktır!

**I:**` + "`Sunucuya katılma tarihinizi gösterir.`" + "\n" + "**II:** `İsim geçmişinizi gösterir.`" + "\n" + "**III:** `Ceza puanınızı gösterir.`" + "\n" + "\n" + "**IV:** `Davet bilgilerinizi gösterir.`" + "\n" + "**V:** `Sahip olduğunuz rolleri gösterir.`" + "\n" + "**VI:** `Hesabınızın oluşturulma tarihini gösterir.`" + "\n\n" + "**VII:** `Kayıtsıza atılın ve yeniden kayıt olun.`" + "\n" + "**VIII:** `Mesaj istatistiklerinizi gösterir.`" + "\n" + "**IX:** `Ses istatistiklerinizi gösterir.`",

{
    components: [
    ilkrow,
    ikincirow,
    üçüncürow
    ]
}

).then(async function(mesaj) {
    mesaj.createButtonCollector(user => user.clicker.user.id == message.author.id).on('collect', async (button) => {

      if(button.id == "bir") {
        var date1 = message.member.joinedAt
        var date = new Date(date1)
        var dateStr =
 ("00" + date.getDate()).slice(-2) + "/" +
  ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
  date.getFullYear() + " " +
  ("00" + date.getHours()).slice(-2) + ":" +
  ("00" + date.getMinutes()).slice(-2) + ":" +
  ("00" + date.getSeconds()).slice(-2);
  const embed = new discord.MessageEmbed()
  .setDescription(`**Sunucuya Katılma Tarihin: ${dateStr}**`)
  .setColor("GREEN")
   message.channel.send(embed)     
        button.reply.defer()
      } else if(button.id == "altı") {
        var date1 = message.member.user.createdAt
        var date = new Date(date1)
        var dateStr =
 ("00" + date.getDate()).slice(-2) + "/" +
  ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
  date.getFullYear() + " " +
  ("00" + date.getHours()).slice(-2) + ":" +
  ("00" + date.getMinutes()).slice(-2) + ":" +
  ("00" + date.getSeconds()).slice(-2);
  const embed = new discord.MessageEmbed()
  .setDescription(`**Hesabını Açma Tarihin: ${dateStr}**`)
  .setColor("GREEN")
   message.channel.send(embed)     
        button.reply.defer()
      } else if(button.id == "beş") {
        var rollerin = message.member.roles.cache.filter(r => r.name !== '@everyone').map(role => "<@&"+role.id + ">").join(", ")
        if(!rollerin) rollerin = "**Hiçbir Role Sahip Değilsin!**"
        const embed = new discord.MessageEmbed()
        .setAuthor("Sende Bulunan Roller")
        .setColor("GREEN")
        .setDescription(rollerin)
        message.channel.send(embed)
        button.reply.defer()
      } else if(button.id == "dört") {
        var user = message.author;

        message.guild.fetchInvites()
        .then

        (invites =>
            {
                const userInvites = invites.array().filter(o => o.inviter.id === user.id);
                var userInviteCount = 0;
                for(var i=0; i < userInvites.length; i++)
                {
                    var invite = userInvites[i];
                    userInviteCount += invite['uses']; //https://stackoverflow.com/questions/59594196/how-to-make-a-invites-command-discord-js
                }
                const embed = new discord.MessageEmbed()
                .setDescription(`**${userInviteCount} Davete Sahipsin**`)
                .setColor("GREEN")
                message.channel.send(embed)
                button.reply.defer()
            }
        )
      }

    })
})


}




exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["menü"],
  permLevel: 0
};
exports.help = {
  name: "menü",
  description: "menülü birşey",
  usage: "menü"
};
