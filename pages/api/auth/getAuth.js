import {getServerSession} from "next-auth";
import {authOptions} from "@/pages/api/auth/[...nextauth]";

export default async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const body = req.body;
            const session = getServerSession(body.req, body.res, authOptions)
            res.status(200).json({message: 'good', data: session})
        } else {
            throw new Error('Unsupported request method')
        }
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}
