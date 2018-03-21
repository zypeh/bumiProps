
import nodemailer from 'nodemailer'

export default ({ to, template: { subject, text }, options }) => {
    const transporter = nodemailer.createTransport(mailer)

    const mail = { from: 'zypeh <zypeh.geek@gmail.com> (test)',
        to,
        subject,
        text,
        options
    }

    transporter.sendMail(mail, (err, info) => {
        if (err) return console.error(err)
    })
}
