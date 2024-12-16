import nodemailer from 'nodemailer'

const mailSender = async (email: string, subject: string, htmlContent: string) : Promise<void> => {
    try{
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            } 
        })
        const mailOptions = {
            from : `Skilloria <${process.env.EMAIL}>`,
            to: email,
            subject: subject,
            html: htmlContent
        }

        const info = await transporter.sendMail(mailOptions)
        console.log(info)
    } catch (err){
        console.log((err as Error).message)
        throw new Error((err as Error).message)
    }
}

export default mailSender