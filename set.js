const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT1BReFFiYWZoYkRkRU44OXFtcjA1MC8xV3V2OFliT0pzelMzd2psUWdXND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidEYrNzRJeGh4QTBaeGJIMHVZczVhejBWdEZKSTBqaER1aW9wMzlEc0tHdz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3SncxNWY5eWtKMEFQU0Y0TXI5bkdBQmE5dFU3dzIzelJmcHlRaHJ0QTFjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvaVM1VGZCRXFhNkhpMzRqditjNEg3Y1A5YlhtbzJrVC8rdnBnNVlkWEhvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlCSHVDUjRWOThDZ3lLRkhrMVl2QU5VL2ZXN1M0LzNzRGVhaVlHbE1DRkU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkR4dkE4NmhiOFVsZ1QwYXpBV25EZmluOUtzQzliY0tneU9mQ1MwbGg0UzQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0krZWdlSmtQeDREc3U3dmFkM1VKeWJ0R1Brei9xQUtaTUJuRnR1WGdXVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0EwclV2V2tzWGpHQWY3a3RaSGY1bzlxZG16eFl5L1hXZWN1aWVRSncwcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ikd6UG95RTZVaFIrMTZqSFJjUUZGZkJ5TXNFT0dIbSsvMmdYMXQ5RzZPZFFPa3NLMFNQTGxKK2R3WmlLaDNTT3pLN3B0NFU3RmNKNEFLYUZ1N1FSV2hBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NzksImFkdlNlY3JldEtleSI6InErSG5ZbW11ek9aWFE3NGM1akRTSENlTllaaGNmZWJHOTR5TlVvTzNWMFk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6Imw2bjdpUm41UVhHM3c5RDNoYVFLVmciLCJwaG9uZUlkIjoiMThmZTllMjQtMjc5Zi00OWEzLWI0NzEtOTdhODZlODZiMTI4IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVtakc5a0R2MHozcG9hWmZCY1JYMWxNVUVsVT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4d3VnVytpdWtpOHBNMUFzOTlQRFEzdXp6SjA9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiMkxSNVBBSDgiLCJtZSI6eyJpZCI6IjI3Nzc0MTI1ODQ1OjMwQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IkFuZ2VsIERpIE1hcmlhIDExIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPN2pucVVERUtpVTRia0dHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJRSHEzUXJSV1VVTSsxSjAzUkFGdnQwNDFYSXhlcmpnSW5yaG5mbGQ1K0U4PSIsImFjY291bnRTaWduYXR1cmUiOiJUTTZ5eE5waE9reWlzclA0OFdHaDcra01JOVVCVWJDdTZrNWJQZ0F0RDNiQ0VaUVlkYmFUV09ldWZDVFVZU01ReXN5MUFCaTZhckZJeWo1S0Y3a2VBZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiTTAzMzFWR25CaCtzSW9pY2pSbEJvSFc5VEdmYXJ5Rk1na0ZUWXVlNXlrdGJURGxUVE9xQTFZeHgxYnFONVRIcGM2Rk1lRG43U0swb3cxMHg2NTk3anc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNzc3NDEyNTg0NTozMEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVQjZ0MEswVmxGRFB0U2ROMFFCYjdkT05WeU1YcTQ0Q0o2NFozNVhlZmhQIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMxNzQyMjYxLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUIydiJ9;;;=>',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "Angel Di maria",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "27774125845",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "on",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
