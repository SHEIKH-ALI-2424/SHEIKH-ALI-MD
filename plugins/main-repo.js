const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const config = require('../config');    
const { cmd } = require('../command');

cmd({
    pattern: "repo",
    alias: ["sc", "script", "info"],
    desc: "Fetch information about a GitHub repository.",
    react: "📂",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    const githubRepoURL = 'https://github.com/SHEIKH-ALI-2424/SHEIKH-ALI-MD';

    try {
        // Extract username and repo name from the URL
        const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/);

        // Fetch repository details using GitHub API
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        
        if (!response.ok) {
            throw new Error(`GitHub API request failed with status ${response.status}`);
        }

        const repoData = await response.json();

        // Format the repository information
        const formattedInfo = `*BOT NAME:*\n> ${repoData.name}\n\n*OWNER NAME:*\n> ${repoData.owner.login}\n\n*STARS:*\n> ${repoData.stargazers_count}\n\n*FORKS:*\n> ${repoData.forks_count}\n\n*GITHUB LINK:*\n> ${repoData.html_url}\n\n*DESCRIPTION:*\n> ${repoData.description || 'No description'}\n\n*Don't Forget To Star and Fork Repository*\n\n> *© Pᴏᴡᴇʀᴇᴅ Bʏ 𝐒𝚯𝚵𝚰𝐊𝚯 𝚫𝐋𝚰 〽️𝐃*`;

        // Send image with caption
        await conn.sendMessage(from, {
            image: { url: `https://i.imghippo.com/files/YZK6549KW.jpg` },
            caption: formattedInfo,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363333032882285@newsletter',
                    newsletterName: '𝐒𝚯𝚵𝚰𝐊𝚯 𝚫𝐋𝚰 〽️𝐃',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

        // Send local audio file
        const audioPath = path.join(__dirname, '../assets/menu.m4a');
        await conn.sendMessage(from, {
            audio: fs.readFileSync(audioPath),
            mimetype: 'audio/mp4',
            ptt: true,
            contextInfo: { 
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363333032882285@newsletter',
                    newsletterName: '𝐒𝚯𝚵𝚰𝐊𝚯 𝚫𝐋𝚰 〽️𝐃',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error("Error in repo command:", error);
        reply("Sorry, something went wrong while fetching the repository information. Please try again later.");
    }
});
