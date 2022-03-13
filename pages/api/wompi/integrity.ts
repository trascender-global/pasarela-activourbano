import type { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const referencia: string | undefined = req.body?.referencia
        const monto: string | undefined = req.body?.monto
        const moneda: string | undefined = req.body?.moneda
        const integridad = process.env.WOMPI_INTEGRITY
        if (referencia && monto && moneda) {
            const cadenaConcatenada = referencia + monto + moneda + integridad
            const encodedText = new TextEncoder().encode(cadenaConcatenada);
            const hashBuffer = crypto.createHash('sha256').update(encodedText).digest()
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            res.status(201).json({ signatureIntegrity: hashHex })
        } else {
            res.statusMessage = 'Faltan parámetros'
            res.status(400)
        }
    } else {
        res.status(405)
    }
}
