import { WompiEventResponse } from "@/types/ApiResponses";
import { WompiTransaction } from "@/types/ApiResponses";
import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from 'nodemailer';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const body: WompiEventResponse = req.body

    if (body.event === 'transaction.updated') {
        const transaction: WompiTransaction = body.data.transaction
        if (transaction.status === 'APPROVED') {
            // TODO: SEND EMAIL
        }
    }

    if (process.env.NODE_ENV === 'development') {
        console.log(body)
    }
    return res.status(200)
}