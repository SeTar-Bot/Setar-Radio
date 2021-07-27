const { Client, MessageEmbed } = require("discord.js");
const Player = require("./helpers/Player");
const RadioStation = require("./helpers/RadioStation");
const Radio = new RadioStation(process.env.RADIO_URL, true);

const client = new Client();

client.on("ready", () => {
    console.log(`✔ ${client.user.username} now Online.`);
    Radio.connect();

    const guild = client.guilds.resolve("721126627165077545");
    client.SetarGuild = guild;

    const VoiceChannel = client.SetarGuild.channels.resolve("869515688941854770");

    VoiceChannel.join().then( (connection) => {
        connection.voice.setSelfDeaf(true);
        Player(connection);
    })
});

Radio.once("ready", () => console.log(`✔ Radio Connected.`))
Radio.on("music", (name) => {
    const TextChannel = client.SetarGuild.channels.resolve("869515632796893194");
    client.user.setActivity({
        name,
        type: "LISTENING"
    });
    TextChannel.bulkDelete(10, true);
    TextChannel.send(new MessageEmbed().setTitle(`Now Playing ${name}`).setDescription("Playing From **Setar-Radio**"));
});

client.login(process.env.TOKEN);