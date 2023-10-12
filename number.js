const { WAConnection } = require('@adiwajshing/baileys');

async function main() {
  const conn = new WAConnection();
  conn.autoReconnect = true; // يجعل الاتصال يعيد التوصيل تلقائيا
  conn.logger.level = 'warn'; // تعيين مستوى السجلات إلى وضع التحذير

  // ربط الاتصال برقم الهاتف
  conn.connectOptions = { 
    phone: '+972528180757', 
    credentialsFile: 'session.json' 
  };

  await conn.connect(); // الاتصال بخادم WhatsApp

  conn.on('chat-update', async (chatUpdate) => {
    if (chatUpdate.messages && chatUpdate.count) {
      const message = chatUpdate.messages.all()[0]; // الرسالة الأولى في التحديث
      const sender = message.key.remoteJID;
      const text = message.message.conversation;

      if (text === '/start') {
        // إذا تم إرسال "/start"، نقوم بإرسال قائمة وازرار بسيطة
        const buttons = [
          { buttonId: '1', buttonText: { displayText: 'زر 1' }, type: 1 },
          { buttonId: '2', buttonText: { displayText: 'زر 2' }, type: 1 },
        ];

        const menu = {
          listType: 1,
          title: 'اختر إجراءً',
          description: 'اضغط على أحد الأزرار',
          buttons,
        };

        await conn.sendMessage(sender, { contentText: 'مرحبًا بك!', footerText: 'Powered by Baileys', buttons: [menu], headerType: 1 });
      } else if (message.message.buttonsResponseMessage) {
        // إذا تم النقر على زر من القائمة
        const selectedButtonId = message.message.buttonsResponseMessage.selectedButtonId;
        await conn.sendMessage(sender, `لقد اخترت الزر رقم ${selectedButtonId}`);
      }
    }
  });
}

main().catch((err) => console.error(err));

