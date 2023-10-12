const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

// توكن البوت الخاص بك من BotFather
const token = '6404622623:AAGMx8-zcKNKz05mJtn-Iowr8dLjc7V4t4w';

// إنشاء مثيل البوت
const bot = new TelegramBot(token, { polling: true });

// دالة لقراءة ملف sansekai.js
function readSansekaiFile() {
  try {
    const data = fs.readFileSync('sansekai.js', 'utf8');
    return data;
  } catch (error) {
    console.error('خطأ في قراءة ملف sansekai.js', error);
    return '';
  }
}

// دالة لكتابة محتوى جديد إلى ملف sansekai.js
function writeSansekaiFile(content) {
  try {
    fs.writeFileSync('sansekai.js', content);
    console.log('تمت كتابة المحتوى إلى ملف sansekai.js');
  } catch (error) {
    console.error('خطأ في كتابة ملف sansekai.js', error);
  }
}

// رد البوت على الأمر /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'مرحبًا! أنا بوت Sansekai.');
  bot.sendMessage(chatId, 'لعرض الأهداف والردود الموجودة في sansekai.js، انقر على /show_goals.');
  bot.sendMessage(chatId, 'لإضافة أو تعديل هدف ورد، انقر على /add_goal.');
});

// رد البوت على الأمر /show_goals لعرض الأهداف والردود
bot.onText(/\/show_goals/, (msg) => {
  const chatId = msg.chat.id;
  const sansekaiContent = readSansekaiFile();
  bot.sendMessage(chatId, 'الأهداف والردود الموجودة في sansekai.js:\n' + sansekaiContent);
});

// رد البوت على الأمر /add_goal لإضافة أو تعديل هدف ورد
bot.onText(/\/add_goal/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'قم بإرسال هدفك الجديد:');
  bot.on('message', (msg) => {
    if (msg.text) {
      const goal = msg.text;
      bot.sendMessage(chatId, 'قم بإرسال الرد على الهدف:');
      bot.on('message', (msg) => {
        if (msg.text) {
          const response = msg.text;

          // قراءة المحتوى الحالي لملف sansekai.js
          let sansekaiContent = readSansekaiFile();

          // إضافة الهدف والرد إلى ملف sansekai.js
          sansekaiContent += `
          case "${goal}":
            m.reply('${response}' );
            break;
          `;

          // كتابة المحتوى الجديد إلى ملف sansekai.js
          writeSansekaiFile(sansekaiContent);

          bot.sendMessage(chatId, 'تمت إضافة الهدف والرد إلى sansekai.js بنجاح.');
        }
      });
    }
  });
});

// ابدأ الاستماع للأوامر
bot.on('message', (msg) => {
  // يمكنك إضافة المزيد من الأوامر هنا
});
