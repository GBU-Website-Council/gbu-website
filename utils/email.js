const nodemailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs');
// const htmlToText = require('html-to-text');

module.exports = class Email {
    constructor(user, url) {
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.from = `GBU web council <${process.env.EMAIL_FROM}>`;
    }

    newTransport() {
        if (process.env.NODE_ENV === 'production') {
            //send grid
            return 1;
        }
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }

    // send the mail
    async send(template, subject) {
        // 1 Render
        // console.log(`${__dirname}`);
        var html;
        try {
            const temp = fs.readFileSync(`${__dirname}/../views/email/passReset.ejs`, `utf-8`)
            html = ejs.render(temp, {
                firstName: this.firstName,
                url: this.url,
                subject,
            });

        } catch (err) {
            console.log(err);
        }
        // const html = ejs.renderFile(`${__dirname}/../views/email/${template}.pug`, {
        //     firstName: this.firstName,
        //     url: this.url,
        //     subject,
        // });
        //2 Define email
        const mailOptions = {
            from: 'Jonas Schmedtmann ' + this.from,
            to: this.to,
            subject,
            html,
        };
        // text: htmlToText.fromString(html),

        // 3 Create a transporter
        await this.newTransport().sendMail(mailOptions);
    }

    async sendWelcom() {
        await this.send('welcome', 'Welcome to the natours family!');
    }

    async sendPasswordReset() {
        await this.send(
            'passReset',
            'Your password reset token, valid for 10 minuts.'
        );
    }
};

// const sendEmail = async (options) => {
//   // !) Create a transport
//   const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_HOST_PORT,
//     auth: {
//       user: process.env.EMAIL_USERNAM,
//       pass: process.env.EMAIL_PASSWORD,
//     },
//   });
//   // 2) Define the email options
//   const mailOption = {
//     from: "Navi <hello@xyz.com>",
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//   };
//   // 3) Actualy send the mail
//   await transporter.sendMail(mailOption);
// };

// module.exports = sendEmail;

// const nodemailer = require("nodemailer");

// const sendEmail = async (options) => {
//   // 1) Create a transporter

//   // 2) Define the email options
//   const mailOptions = {
//     from: 'Jonas Schmedtmann <hello@jonas.io>',
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//     // html:
//   };

//   // 3) Actually send the email
//   await transporter.sendMail(mailOptions);
// };

// module.exports = sendEmail;
