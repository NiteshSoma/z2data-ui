import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const cookies = cookie.parse(req.headers.cookie || '');

    if (cookies.userSession) {
        try {
            const session = JSON.parse(cookies.userSession);
            res.status(200).json({ session });
        } catch (error) {
            console.log(error);
            res.status(400).json({ error: 'Invalid session data' });
        }
    } else {
        res.status(404).json({ error: 'Session not found' });
    }
}