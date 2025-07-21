const { cmd } = require('../command');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const fetchJson = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('fetchJson Error:', error.message);
    if (error.response) {
      console.error('Response Status:', error.response.status);
      console.error('Response Data:', JSON.stringify(error.response.data, null, 2));
    }
    return null;
  }
};

cmd({
  pattern: "xdownload",
  alias: ["xnxxdl", "xxx"],
  react: "📥",
  desc: "Download videos from Xvideos.",
  category: "utility",
  filename: __filename
}, async (conn, m, msgInfo, { q: inputUrl, reply }) => {
  try {
    if (!inputUrl) return reply("❌ Please provide a valid Xvideos URL.");

    const apiURL = `https://api.giftedtech.web.id/api/download/xvideosdl?apikey=gifted&url=${encodeURIComponent(inputUrl)}`;
    console.log("Requesting API with URL:", apiURL);

    const result = await fetchJson(apiURL);
    if (!result || !result.result) {
      console.log("❌ Failed to fetch video. Please check the URL or try again later.");
      return reply("❌ Failed to fetch video. Please check the URL or try again later.");
    }

    const video = result.result;
    const videoUrl = video.download_url;
    const title = video.title.replace(/[<>:"/\\|?*]/g, '');
    const filePath = path.join(__dirname, title + '.mp4');

    console.log("Subzero Downloading video...");
    const videoStream = await axios({
      url: videoUrl,
      method: 'GET',
      responseType: 'stream'
    });

    const writer = fs.createWriteStream(filePath);
    videoStream.data.pipe(writer);

    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    console.log("SHEIKH-ALI-MD downloaded video successfully:", filePath);

    await conn.sendMessage(msgInfo.chat, {
      video: fs.readFileSync(filePath),
      caption: `*SHEIKH-ALI-MD XVIDEOS DL*\n\n🎥 *Title:* ${video.title}\n👀 *Views:* ${video.views}\n👍 *Likes:* ${video.likes}\n\n*© Pᴏᴡᴇʀᴇᴅ Bʏ 𒁂𓄂❥.𝑺𝑯𝑬𝑰𝑲𝑯 𝑨𝑳𝑰 🔥༽༼࿐ ♡••²⁴⁰²* `
    });

    fs.unlinkSync(filePath); // delete after sending
    console.log("Video sent and file cleaned up.");
  } catch (err) {
    console.error("Unexpected Error:", err.message);
    reply("❌ An erro
r occurred while processing your request. Please try again.");
  }
});
