const fetch = require('node-fetch');
const { cmd } = require('../command');

console.log("Hello World!");

cmd({
  pattern: 'tt2',
  alias: ['tiktok2', 'tiktokvid2', 'ttdown2', 'ttdl', 'tt'],
  desc: 'Download videos or images from TikTok.',
  react: '✅',
  category: 'tools',
  filename: __filename
}, async (conn, m, msg, { from, args, reply }) => {
  try {
    const url = args[0];

    if (!url || !url.startsWith('http'))
      return reply(`Please provide a valid TikTok link.\n\n*Usage Example:*\n\n.tt2 <TikTok video URL>`);

    const res = await fetch(`https://api.yanzbotz.live/api/downloader/tiktok?url=${encodeURIComponent(url)}&apiKey=yanzdev`);
    const data = await res.json();

    if (!data || !data.result)
      return reply('Sorry, I couldn\'t fetch the TikTok content. Please check the link and try again.');

    const result = data.result;

    const caption =
      `╭━━━〔 *SUBZERO-MD* 〕━━━┈⊷\n` +
      `┃▸╭───────────\n` +
      `┃▸┃๏ *TIKTOK DOWNLOADER*\n` +
      `┃▸└───────────···๏\n` +
      `╰────────────────┈⊷\n` +
      `╭━━〔 *Post Details* 〕━━┈⊷\n` +
      `┇๏ *Type:* ${result.type || 'N/A'}\n` +
      `┇๏ *Name:* ${result.name || 'N/A'}\n` +
      `┇๏ *Username:* ${result.username || 'N/A'}\n` +
      `┇๏ *Views:* ${result.views || 0}\n` +
      `┇๏ *Likes:* ${result.likes || 0}\n` +
      `┇๏ *Comments:* ${result.comments || 0}\n` +
      `┇๏ *Favorites:* ${result.favorite || 0}\n` +
      `┇๏ *Shares:* ${result.shares || 0}\n` +
      `┇๏ *Description:* ${result.description || 'N/A'}\n` +
      `╰━━━━━━━━━━━━──┈⊷\n> © ᴘᴏᴡᴇʀᴇᴅ ʙʏ sᴜʙᴢᴇʀᴏ`;

    if (result.type === 'video') {
      await conn.sendMessage(from, {
        video: { url: result.video.no-watermark },
        caption
      }, { quoted: msg });
    } else if (result.type === 'image') {
      for (const [index, image] of (result.image || []).entries()) {
        await conn.sendMessage(from, {
          image: { url: image },
          caption: `*💜 Image:* ${index + 1}\n\n${caption}`
        }, { quoted: msg });
      }
    } else {
      return reply("Sorry, I couldn't process this type of TikTok content.");
    }
  } catch (err) {
    console.error("Error in TikTok command:", err);
    reply("An error occurred while processing your request. Please try again later.");
  }
});
                
