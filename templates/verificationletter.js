
const verificationLetter = (verificationToken) => {
  const logoPath = "https://res.cloudinary.com/dgmq8pzz3/image/upload/f_auto,q_auto/v1772757654/RW/Public/logo.png";

  return `
    <!DOCTYPE html>
    <html lang="uk">
    <head>
      <meta charset="UTF-8">
      <title>Підтвердження пошти</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f6f6f6; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 40px auto; background-color: #ffffff; border-radius: 8px; padding: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">

              <div style="height: 120px; width: 120px; border-radius: 50%; background: linear-gradient(135deg, #f3f3f3, #e9e9e9); margin: 0 auto 20px; box-shadow: 4px 8px 10px rgba(33, 33, 33, 0.2);">
                  <img src="${logoPath}" alt="Логотип" style="width: 120px;">
              </div>
                  

              <h1 style="color: #333333; font-size: 24px; text-align: center;">Привіт!</h1>
              <p style="color: #5C5C5C; font-size: 16px; line-height: 1.5; text-align: center;">Дякуємо за реєстрацію в додатку <strong>RW Worship</strong>! <br>Будь ласка, підтвердіть вашу електронну пошту</p>
              <a href="${process.env.BASE_URL}api/auth/verify/${verificationToken}"  style="display: block; width: 200px; margin: 30px auto; text-align: center; background: linear-gradient(135deg, #ffffff, #f1f1f1); padding: 12px 0; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 16px; color: #94A3B4; box-shadow: 1px 2px 0px rgba(33, 33, 33, 0.4); border: 0.4px solid rgba(33, 33, 33, 0.1)" >Підтвердити</a>
              
              <p style="line-height: 1.5; letter-spacing: normal; text-align: center; font-size: 12px; color: #999999; margin-top: 20px;">Якщо ви не реєструвались у додатку, просто проігноруйте цей лист.</p>
          </div>
      </body>
    </html>
  `;
};

module.exports = verificationLetter;