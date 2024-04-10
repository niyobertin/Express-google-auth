import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config()

console
class Mailer {
    private transporter : nodemailer.Transporter;

    constructor(){
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: `${process.env.USER}`,
                pass: `${process.env.PASSWORD}`
            }
        })
    }
    async sendMail(to: string, subject: string, text: string){

        const mailOptions = {
            from: `${process.env.USER}`,
            to: to,
            subject: subject,
            text: text
        };

        try{
            const info = await this.transporter.sendMail(mailOptions);
            console.log(`Email sent: ${info.response}`);
        } catch (error){
            console.error(`Error sending email: ${error}`);
        }
    }
}

export default new Mailer();
