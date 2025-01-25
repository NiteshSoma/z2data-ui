// pages/api/set-session.ts
import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { username } = req.body;

        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }

        // Set the cookie with username and expiration time
        const expiry = new Date();
        expiry.setSeconds(expiry.getSeconds() + 180); // Alter this value for adjusting session expiry

        const cookieValue = JSON.stringify({ username });
        res.setHeader('Set-Cookie', cookie.serialize('userSession', cookieValue, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            expires: expiry,
            path: '/',
        }));

        return res.status(200).json({ name: username });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
}
