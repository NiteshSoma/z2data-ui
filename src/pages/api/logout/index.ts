import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        res.setHeader('Set-Cookie', cookie.serialize('userSession', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: new Date(0),
            path: '/',
        }));

        return res.status(200).json({ message: 'Logged out successfully' });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
}