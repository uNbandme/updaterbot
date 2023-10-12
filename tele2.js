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

// دالة لعرض الأهداف والردود
function displayGoalsAndResponses(chatId) {
  const sansekaiContent = readSansekaiFile();
  const goalsAndResponses = sansekaiContent.match(/case "(.*?)":(.*?)(?=\n\n|\n$)/gs);

  if (goalsAndResponses) {
    const formattedGoalsAndResponses = goalsAndResponses.map((item) => {
      const parts = item.split('"');
      const goal = parts[1];
      const response = parts[3].trim();
      return `${goal} => ${response}`;
    });

    bot.sendMessage(chatId, 'الأهداف والردود الموجودة في sansekai.js:\n\n' + formattedGoalsAndResponses.join('\n'));
  } else {
    bot.sendMessage(chatId, 'لا توجد أهداف وردود محددة في sansekai.js.');
  }
}

// رد البوت على الأوامر
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const text = 'مرحبًا! اختر خيارًا من القائمة:';
  const keyboard = {
    reply_markup: {
      keyboard: [['عرض الأهداف والردود', 'إضافة هدف جديد']],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  };

  bot.sendMessage(chatId, text, keyboard);
});

bot.onText(/عرض الأهداف والردود/, (msg) => {
  const chatId = msg.chat.id;
  displayGoalsAndResponses(chatId);
});

bot.onText(/إضافة هدف جديد/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'قم بإرسال الهدف الجديد:');
  bot.on('message', (msg) => {
    if (msg.text) {
      const goal = msg.text;
      bot.sendMessage(chatId, 'قم بإرسال الرد على الهدف:');
      bot.on('message', (msg) => {
        if (msg.text) {
          const response = msg.text;

          // قراءة المحتوى الحالي لملف sansekai.js
          let sansekaiContent = readSansekaiFile();

          // إضافة هدف والرد إلى ملف sansekai.js
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

