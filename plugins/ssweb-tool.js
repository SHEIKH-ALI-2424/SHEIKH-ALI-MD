// code by ⿻ ⌜ 𝐒𝚯𝚵𝚰𝐊𝚯 𝚫𝐋𝚰 ⌟⿻⃮͛🇵🇰𖤐

const axios = require("axios");
const config = require('../config');
const { cmd } = require('../command');

cmd({
  pattern: "sss",
  alias: ["ssweb"],
  react: "💫",
  desc: "Download screenshot of a given link.",
  category: "other",
  use: ".ss <link>",
  filename: __filename,
}, 
async (conn, mek, m, {
  from, l, quoted, body, isCmd, command, args, q, isGroup, sender, 
  senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, 
  groupMetadata, groupName, participants, isItzcp, groupAdmins, 
  isBotAdmins, isAdmins, reply 
}) => {
  if (!q) {
    return reply("Please provide a URL to capture a screenshot.");
  }

  try {
    // created by jawad tech 
    const response = await axios.get(`https://api.siputzx.my.id/api/tools/ssweb?url=${q}`);
    const screenshotUrl = response.data.screenshotUrl;

    // give credit and use
    const imageMessage = {
      image: { url: screenshotUrl },
      caption: "*WEB SS DOWNLOADER*\n\n> *© Pᴏᴡᴇʀᴇᴅ Bʏ 𝐒𝚯𝚵𝚰𝐊𝚯 𝚫𝐋𝚰 〽️𝐃*",
      contextInfo: {
        mentionedJid: [m.sender],
        forwardingScore: 999,
        isForwarded: true,
        forwardedNewsletterMessageInfo: {
          newsletterJid: '120363333032882285@newsletter',
          newsletterName: "𝐒𝚯𝚵𝚰𝐊𝚯 𝚫𝐋𝚰 〽️𝐃",
          serverMessageId: 143,
        },
      },
    };

    await conn.sendMessage(from, imageMessage, { quoted: m });
  } catch (error) {
    console.error(error);
    reply("Failed to capture the screenshot. Please try again.");
  }
});

// ⿻ ⌜ 𝐒𝚯𝚵𝚰𝐊𝚯 𝚫𝐋𝚰 ⌟⿻⃮͛🇵🇰𖤐
