# Discord Embed Mesaj Gönderme Komutu

const lib = require('lib')({token: process.env.STDLIB_SECRET_TOKEN});

await lib.discord.channels['@0.2.0'].messages.create({
  "channel_id": `${context.params.event.channel_id}`,
  "content": `Mesaj`,
  "tts": false,
  "embeds": [
    {
      "type": "rich",
      "title": `Embed Baş Mesaj`,
      "description": `Embed Mesaj`,
      "color": "0xembedrenk",
      "url": `Embed Link`
    }
  ]
});
