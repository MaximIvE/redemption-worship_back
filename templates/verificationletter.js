require("dotenv").config();

const verificationLetter = (verificationToken)=>{
  return `
    <!DOCTYPE html>
    <html lang="uk">
    <head>
      <meta charset="UTF-8">
      <title>Підтвердження пошти</title>
    </head>

    <body style="font-family: Arial, sans-serif; background-color: #f6f6f6; margin: 0; padding: 40px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 30px;">

              <div style="height: 120px; width: 120px; border-radius: 50%; background: linear-gradient(135deg, #fafafa, #ececec); margin: 0 auto 20px;">
                  <img src="${process.env.BASE_APP_URL}logo192.png" alt="Логотип" style="width: 120px;">
              </div>

              <h1 style="color: #333333; font-size: 24px; text-align: center;">Привіт!</h1>
              <p style="color: #5C5C5C; font-size: 16px; line-height: 1.5; text-align: center;">Дякуємо за реєстрацію в додатку <strong>RW Worship</strong>! <br>Будь ласка, підтвердіть вашу електронну пошту</p>
              <a href="${process.env.BASE_APP_URL}auth/verification/${verificationToken}" target="_blank" style="display: block; width: 200px; margin: 30px auto; text-align: center; background: linear-gradient(135deg, #ffffff, #f1f1f1); padding: 12px 0; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 16px; color: #94A3B4;  border: 0.4px solid rgba(33, 33, 33, 0.1)">Підтвердити</a>
              
              <p style="line-height: 1.5; letter-spacing: normal; text-align: center; font-size: 12px; color: #999999; margin-top: 20px;">Якщо ви не реєструвались у додатку, просто проігноруйте цей лист.</p>
          </div>
      </body>
    </html>
  `;
};

module.exports = verificationLetter;