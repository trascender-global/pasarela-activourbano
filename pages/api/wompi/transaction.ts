import { WompiEventResponse } from "@/types/ApiResponses";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const body: WompiEventResponse = req.body
    if (process.env.NODE_ENV === 'development') {
        console.log(body)
    }
    // TODO: AQUÍ DEBERÍA IR EL LLAMADO AL API DE SOFTINM PARA ACTUALIZAR EL ESTADO
    res.status(200)
}