const { Client } = require('discord.js-selfbot-v13');
const client = new Client();

let enabled = true;

client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);
})

client.on("channelCreate", async function(channel){
  if (!enabled) return;

  if (channel.parentId === '1185991672740466729' || channel.parentId === '1241839758255194134') {
    setTimeout(async() => {
      claimTicket(channel);
    }, randomRange(250, 2000));
  }
})

client.on("messageCreate", function(message){
  if (message.author.id !== '811580599068262421') {
    return;
  }

  if (message.content === ":?toggle") {
    enabled = !enabled;
    console.log(`Set to ${enabled}`);
  }
});

claimTicket = async(channel) => {
  const messages = await channel.messages.fetch({ after: '0', limit: 1 });
  const firstMessage = messages.first();

  try {
    firstMessage.clickButton({
      X: 2, Y: 0,
    })

    setTimeout(() => {
      channel.send("Hello. How can I help?");
    }, randomRange(2000, 5000));

    console.log(`Claimed Ticket ${channel.id}`)
  } catch (error) {
    console.error(error);
  }
}

randomRange = (min, max) => {
  return Math.floor(Math.random * (max - min + 1)) + min;
}


client.login('TOKEN_HERE');
