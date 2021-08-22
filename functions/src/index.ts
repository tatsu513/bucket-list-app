const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const cors = require('cors')({origin: true});
const gmailEmail = functions.config().gmail.mail;
const gmailPassword = functions.config().gmail.password;

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

admin.initializeApp();

// Using Gmail
const transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
}));

// Sending the request
exports.sendMail = functions.https.onRequest((req: any, res: any) => {
  cors(req, res, () => {
    // const dest = req.query.dest;

    const mailOptions = {
      from: 'John Doe <example@example.com>',
      to: '0285mashiko@gmail.com',
      subject: 'Test Mail', // email subject
      text: 'Plain Text Test Email',
      html: '<h2>テストのメールだよ</h2>', // HTML Mail
    };

    return transporter.sendMail(mailOptions, (error: any, info: any) => {
      if (error) {
        return res.send(error.toString());
      }

      return res.send('Mail Sended');
    });
  });
});

export const helloWorld = functions.https.onRequest((request: any, response: any) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase!');
});
