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
    // var prefix = /^[\\/!#.]/gi.test(body) ? body.match(/^[\\/!#.]/gi) : "/"
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
        case "בעע": case "ב.ע.ע": case "מידע":
          m.reply(`        * ☆°•ב▪︎ע▪︎ע•°☆*
 ---------------------------------
*עאהד*: 524513689\n
*בילאל*:  52-481-2700\n
*משרד*:  52-944-0702\n
*מחמד עתילי*:  53-277-1511\n
                                                              \n*שאקר*:053-6228307
-----------------------------------\n\n
                    *°•☆נהגים☆•°*\n\n
 *יוסף עיראקי*:  52-297-4995\n
 *עתילי עתילי*:  52-878-8515\n
 *מחמד מסארוה*:  54-399-9085\n
 *מונדר*:  54-473-6990\n
 *ראפת*:  50-552-4284\n
 *קרמאן*:  50-595-8942\n
 *מורינו*: 0555501085\n
-------------------------------\n\n
                    *°•מפעלים•°*
 *גומאן*:  54-909-4123\n
 *רשיד*:  54-259-6865\n
 *סוהאיב*:  52-269-3719\n
`)
case "אבו ראס": case "עלי אבו ראס": case "ראס": case "עלי":
          m.reply(`*עלי אבו ראס*\n\n°•העמסות•°\n\n▪︎כתובת ארלוזורוב 87 תל* אביבי*:https://waze.com/ul/hsv8wx2zvf\n`);
          break;
          case "דניה":case"גיאו"   :
          m.reply('*°•גיאו דניה•°*\nאבן גבירול 85:\nhttps://waze.com/ul/hsv8wx2z0k\n\n  *שפיכה* *471*\n\n*471 מזרח:*\nhttps://waze.com/ul/hsv8y6mdd2\n471 :\n https://waze.com/ul/hsv8y6vfej :*מערב* ');
          break;
          case "שאקר":
            m.reply('*°•חפירות ושפיכות של שאקר•°*\n\n *כפר הירוק*: https://waze.com/ul/hsv8yb2s19\n\n*פיבל*: استخدم Waze للقيادة إلى זלוציסטי 1 - 10: https://waze.com/ul/hsv8wx8xkn\n\n *שפיכה טייבה*:\n https://waze.com/ul/hsv8zt4681');
            break;
            case "עאהד":
              m.reply('*°•כתובות של עאהד•°*\n\n*צייטלין*:https://waze.com/ul/hsv8wrrzkb\n*התומר רמת השרון*:https://waze.com/ul/hsv8ybcqk9\n' );
                break;
case "":
m.reply('   *רישמות עדכניות*  \n *הקלד*: \n /שאקר \n    /עלי    \n    /דניה  \n   /עאהד \n    /אלי   \n/crtg \n\n *להצגת מספרי טלפון הקלד*\n\n / מידע  /בעע  /ב.ע.ע');
break;

case "אלי שמש": 
case "שמש":
  case"אלי":
  m.reply('  *כתובות של אלי שמש*  \n\n     ~יעודכן בהקדם~ ');
  break;
        case "ai": case "/": case "!": case "*":
          try {
            // tidak perlu diisi apikeynya disini, karena sudah diisi di file key.json
            if (setting.keyopenai === "ISI_APIKEY_OPENAI_DISINI") return reply("Apikey belum diisi\n\nSilahkan isi terlebih dahulu apikeynya di file key.json\n\nApikeynya bisa dibuat di website: https://beta.openai.com/account/api-keys");
            if (!text) return reply(`لتلقي الرد عبر الذكاء الصناعي.\n\nادخل:\n*${prefix}${command} مرحبا*`);
            const configuration = new Configuration({
              apiKey: setting.keyopenai,
            });
            const openai = new OpenAIApi(configuration);
            const response = await openai.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [{role: "user", content: text}],
          });
          m.reply(`${response.data.choices[0].message.content}`);
          } catch (error) {
          if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
            console.log(`${error.response.status}\n\n${error.response.data}`);
          } else {
            console.log(error);
            m.reply("Maaf, sepertinya ada yang error :"+ error.message);
          }
        }
          break;
case "crtg":
case "Crtg":
case "CRTG":
    m.reply('*כתובת רלוונטית ל CRTG*\n\n *מחלף רמת אפעל*\n:https://waze.com/ul/hsv8y2ev8v');
    break;
        case "img": case "ارسم": case "صورة": case "أرسم": case "صوره": case "img":
          try {
            // tidak perlu diisi apikeynya disini, karena sudah diisi di file key.json
            if (setting.keyopenai === "ISI_APIKEY_OPENAI_DISINI") return reply("Apikey belum diisi\n\nSilahkan isi terlebih dahulu apikeynya di file key.json\n\nApikeynya bisa dibuat di website: https://beta.openai.com/account/api-keys");
            if (!text) return reply(`لرسم باستخدام الذكاء الصناعي.\n\nContoh:\n${prefix}${command} ووصف الصورة`);
            const configuration = new Configuration({
              apiKey: setting.keyopenai,
            });
            const openai = new OpenAIApi(configuration);
            const response = await openai.createImage({
              prompt: text,
              n: 1,
              size: "512x512", // you can change the size of the image here
            });
            //console.log(response.data.data[0].url) // see the response
            client.sendImage(from, response.data.data[0].url, text, mek);
            } catch (error) {
          if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
            console.log(`${error.response.status}\n\n${error.response.data}`);
          } else {
            console.log(error);
            m.reply("اعتذر عن الرد حاليا اارجاء الانتظار قليلا :"+ error.message);
          }
        }
          break; 
          case "sc": case "script": case "scbot":
           m.reply("*☆°•ב▪︎ע▪︎ע•°☆* ~Start~");
          break
        default: {
          if (isCmd2 && budy.toLowerCase() != undefined) {
            if (m.chat.endsWith("broadcast")) return;
            if (m.isBaileys) return;
            if (!budy.toLowerCase()) return;
            if (argsLog || (isCmd2 && !m.isGroup)) {
              // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
              console.log(chalk.black(chalk.bgRed("[ ERROR ]")), color("command", "turquoise"), color(`${prefix}${command}`, "turquoise"), color("tidak tersedia", "turquoise"));
            } else if (argsLog || (isCmd2 && m.isGroup)) {
              // client.sendReadReceipt(m.chat, m.sender, [m.key.id])
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
