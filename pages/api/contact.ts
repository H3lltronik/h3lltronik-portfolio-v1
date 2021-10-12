const nodemailer = require("nodemailer");
require("dotenv").config();
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    message: string,
    status: string|number;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const body = JSON.parse(req.body);
    const transporter = nodemailer.createTransport({
        port: Number(process.env.MAILING_PORT),
        host: process.env.MAILING_HOST,
        auth: {
            user: process.env.CONTACT_EMAIL,
            pass: process.env.CONTACT_PASSWORD,
        },
        secure: true,
    });

    const mailData = {
        from: process.env.CONTACT_EMAIL,
        to: process.env.PERSONAL_EMAIL,
        subject: `Mensaje de contacto del portafolio H3lltronik`,
        html: `
            <div>Nombre: ${body.fullName}</div>
            <div>Email: ${body.email}</div>
            <div>Mensaje: ${body.message}</div>
        `,
    };
    console.log("About to send the mail...");
    const result:Data = await new Promise((resolve, reject) => {
        transporter.sendMail(mailData, function (err: any, info: any) {
            if (err) {
                console.error(err);
                reject({
                    status: 500,
                    message: 'Email not sent'
                })
            } else {
                console.log(info);
                resolve({
                    status: 500,
                    message: 'Email not sent'
                })
            }
        });
    });

    return res.status(200).json(result);
}
