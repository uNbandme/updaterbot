const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require("@adiwajshing/baileys");
const fs = require("fs");
const util = require("util");
const chalk = require("chalk");
const { Configuration, OpenAIApi } = require("openai");
let setting = require("./key.json");

module.exports = sansekai = async (client, m, chatUpdate, store) => {
  try {
    var body =
      m.mtype === "conversation"
        ? m.message.conversation
        : m.mtype == "imageMessage"
        ? m.message.imageMessage.caption
        : m.mtype == "videoMessage"
        ? m.message.videoMessage.caption
        : m.mtype == "extendedTextMessage"
        ? m.message.extendedTextMessage.text
        : m.mtype == "buttonsResponseMessage"
        ? m.message.buttonsResponseMessage.selectedButtonId
        : m.mtype == "listResponseMessage"
        ? m.message.listResponseMessage.singleSelectReply.selectedRowId
        : m.mtype == "templateButtonReplyMessage"
        ? m.message.templateButtonReplyMessage.selectedId
        : m.mtype === "messageContextInfo"
        ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text
        : "";
    var budy = typeof m.text == "string" ? m.text : "";
    var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/";
    const isCmd2 = body.startsWith(prefix);
    const command = body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase();
    const args = body.trim().split(/ +/).slice(1);
    const pushname = m.pushName || "No Name";
    const botNumber = await client.decodeJid(client.user.id);
    const itsMe = m.sender == botNumber ? true : false;
    let text = (q = args.join(" "));
    const arg = budy.trim().substring(budy.indexOf(" ") + 1);
    const arg1 = arg.trim().substring(arg.indexOf(" ") + 1);

    const from = m.chat;
    const reply = m.reply;
    const sender = m.sender;
    const mek = chatUpdate.messages[0];

    const color = (text, color) => {
      return !color ? chalk.green(text) : chalk.keyword(color)(text);
    };

    // Group
    const groupMetadata = m.isGroup ? await client.groupMetadata(m.chat).catch((e) => {}) : "";
    const groupName = m.isGroup ? groupMetadata.subject : "";

    // Push Message To Console
    let argsLog = budy.length > 30 ? `${q.substring(0, 30)}...` : budy;

    if (isCmd2 && !m.isGroup) {
      console.log(chalk.black(chalk.bgWhite("[ LOGS ]")), color(argsLog, "turquoise"), chalk.magenta("From"), chalk.green(pushname), chalk.yellow(`[ ${m.sender.replace("@s.whatsapp.net", "")} ]`));
    } else if (isCmd2 && m.isGroup) {
      console.log(
        chalk.black(chalk.bgWhite("[ LOGS ]")),
        color(argsLog, "turquoise"),
        chalk.magenta("From"),
        chalk.green(pushname),
        chalk.yellow(`[ ${m.sender.replace("@s.whatsapp.net", "")} ]`),
        chalk.blueBright("IN"),
        chalk.green(groupName)
      );
    }

    if (isCmd2) {
      switch (command) {
        case "בעע":
        case "ב.ע.ע":
        case "מידע":
          m.reply(`❇️*_ ☆°•ב▪︎ע▪︎ע•°☆_*✳️\n\n* *1️⃣* * *עאהד*: 524513689\n* *2️⃣* * *בילאל*: 52-481-2700\n* *3️⃣* * *משרד*: 52-944-0702\n* *4️⃣* * *מחמד עתילי*: 53-277-1511\n\n* *שאקר5️⃣*: 053-6228307\n\n❇️*°•☆נהגים☆•°*✳️\n\n1️⃣ *יוסף עיראקי*: 52-297-4995\n2️⃣ *עתילי עתילי*: 52-878-8515\n3️⃣ *מחמד מסארוה*: 54-399-9085\n4️⃣ *מונדר*: 54-473-6990\n5️⃣ *ראפת*: 50-552-4284\n6️⃣ *קרמאן*: 50-595-8942\n7️⃣ *מורינו*: 0555501085\n\n❇️*°•מפעלים•°*✳️\n\n1️⃣ *גומאן*: 54-909-4123\n2️⃣ *רשיד*: 54-259-6865\n3️⃣ *סוהאיב*: 52-269-3719`);
          break;
        case "אבו ראס":
        case "עלי אבו ראס":
        case "ראס":
        case "עלי":
          m.reply(`❇️*_עלי אבו ראס_*✳️\n\n°•העמסות•°\n\n▪︎כתובת ארלוזורוב 87 תל* אביבي*✔️: ➡️ https://waze.com/ul/hsv8wx2zvf\n`);
          break;
        case "דניה":
        case "גיאו":
          m.reply('❇️*°•גיאו דניה•°*✳️\nאבן גבירול 85:\n➡️ https://waze.com/ul/hsv8wx2z0k\n\n*שפיכה* *471*✔️\n\n*471 מזרח*: ➡️ https://waze.com/ul/hsv8y6mdd2\n471 : ➡️ https://waze.com/ul/hsv8y6vfej *מערב*');
          break;
        case "שאקר":
          m.reply('❇️*°•חפירות ושפיכות של שאקר•°*✳️\n\n *כפר הירוק*: ➡️ https://waze.com/ul/hsv8yb2s19\n\n*פיבל*: استخدم Waze للقيادة إلى זלוציסטי 1 - 10: ➡️ https://waze.com/ul/hsv8wx8xkn\n *שפיכה טייבה*:\n ➡️ https://waze.com/ul/hsv8zt4681');
          break;
        case "עאהד":
          m.reply('❇️*°•כתובות של עאהד•°*✳️\n\n*צייטלין*: ➡️ https://waze.com/ul/hsv8wrrzkb\n*התומר רמת השרון*: ➡️ https://waze.com/ul/hsv8ybcqk9\n');
          break;
        case "":
          m.reply('❇️*רישמות עדכניות*✳️\n\n*הקלד*: \n/שאקר✅️\n/עלי✅️\n/דניה✅️\n/עאהד✅️\n/אלי✅️\n\n/יוסי✅️\n\n|✅️/crtg\n\n*להצגת מספרי טלפון הקלד שם רצוי كُلفَ مِقْداراً*: \n/ معلومات /בעע/ב.ע.ע');
          break;
        case "אלי שמש":
        case "שמש":
        case "אלי":
          m.reply('❇️*כתובות שل ألي شمس*✳️\n\n     ~سوف يتم التحديث قريبًا~');
          break;
        case "ai":
        case "/":
        case "!":
        case "*":
          try {
            if (setting.keyopenai === "ISI_APIKEY_OPENAI_DISINI") return reply("❇️*خطأ في مفتاح API*✳️\n\nلم يتم تعيين مفتاح API. يرجى تعبئة مفتاح الAPI في ملف key.json أولاً. يمكنك إنشاء مفتاح API على الموقع التالي: https://beta.openai.com/account/api-keys");
            if (!text) return reply(`❇️*للحصول على رد من الذكاء الاصطناعي، أدخل النص بعد الأمر*\n\nمثال:\n${prefix}${command} مرحبًا`);
            const configuration = new Configuration({
              apiKey: setting.keyopenai,
            });
            const openai = new OpenAIApi(configuration);
            const response = await openai.createChatCompletion({
              model: "gpt-3.5-turbo",
              messages: [{ role: "user", content: text }],
            });
            m.reply(`${response.data.choices[0].message.content}`);
          } catch (error) {
            if (error.response) {
              console.log(error.response.status);
              console.log(error.response.data);
              console.log(`${error.response.status}\n\n${error.response.data}`);
            } else {
              console.log(error);
              m.reply("❇️*عذرًا، هناك خطأ*✳️\n\n" + error.message);
            }
          }
          break;
        case "crtg":
        case "Crtg":
        case "CRTG":
          m.reply('❇️*كتروجيت*: ➡️ https://waze.com/ul/hsv8y2ev8v');
          break;
        case "יוסי":
        case "חנה":
        case "אברהאמי":
          m.reply('❇️*יוסי אברהאמי*✳️\n\n *חנה רובינא*: ➡️ https://waze.com/ul/hsv8ybxcg2');
          break;
        case "img":
        case "ارسم":
        case "صورة":
        case "أرسم":
        case "صوره":
          try {
            if (setting.keyopenai === "ISI_APIKEY_OPENAI_DISINI") return reply("❇️*خطأ في مفتاح API*✳️\n\nلم يتم تعيين مفتاح API. يرجى تعبئة مفتاح الAPI في ملف key.json أولاً. يمكنك إنشاء مفتاح API على الموقع التالي: https://beta.openai.com/account/api-keys");
            if (!text) return reply(`❇️*لرسم صورة باستخدام الذكاء الاصطناعي، قم بإدخال الوصف بعد الأمر*\n\nمثال:\n${prefix}${command} وصف الصورة`);
            const configuration = new Configuration({
              apiKey: setting.keyopenai,
            });
            const openai = new OpenAIApi(configuration);
            const response = await openai.createImage({
              prompt: text,
              n: 1,
              size: "512x512",
            });
            client.sendImage(from, response.data.data[0].url, text, mek);
          } catch (error) {
            if (error.response) {
              console.log(error.response.status);
              console.log(error.response.data);
              console.log(`${error.response.status}\n\n${error.response.data}`);
            } else {
              console.log(error);
              m.reply("❇️*عذرًا، هناك خطأ*✳️\n\n" + error.message);
            }
          }
          break;
        case "sc":
        case "script":
        case "scbot":
          m.reply("*❇️*_ ☆°•ב▪︎ע▪︎ע•°☆_* ~Start~");
          break;
        default: {
          if (isCmd2 && budy.toLowerCase() != undefined) {
            if (m.chat.endsWith("broadcast")) return;
            if (m.isBaileys) return;
            if (!budy.toLowerCase()) return;
            if (argsLog || (isCmd2 && !m.isGroup)) {
              console.log(chalk.black(chalk.bgRed("[ ERROR ]")), color("command", "turquoise"), color(`${prefix}${command}`, "turquoise"), color("tidak tersedia", "turquoise"));
            } else if (argsLog || (isCmd2 && m.isGroup)) {
              console.log(chalk.black(chalk.bgRed("[ ERROR ]")), color("command", "turquoise"), color(`${prefix}${command}`, "turquoise"), color("tidak tersedia", "turquoise"));
            }
          }
        }
      }
    }
  } catch (err) {
    m.reply(util.format(err));
  }
};
let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
