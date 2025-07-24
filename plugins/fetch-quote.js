const axios = require("axios");
const { cmd } = require("../command");

cmd({
  pattern: "quote",
  desc: "Get a random inspiring quote.",
  category: "fun",
  react: "💬",
  filename: __filename
}, async (conn, m, store, { from, reply }) => {
  try {
    const response = await axios.get("https://api.quotable.io/random");
    const { content, author } = response.data;

    const message = `💬 *"${content}"*\n- ${author}\n\n> *© Pᴏᴡᴇʀᴇᴅ Bʏ 𝐒𝚯𝚵𝚰𝐊𝚯 𝚫𝐋𝚰 〽️𝐃*`;
    reply(message);
  } catch (error) {
    console.error("Error fetching quote:", error);
    reply("⚠️ API issue or coding error, please check the logs!");
  }
});
