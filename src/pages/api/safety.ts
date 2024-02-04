// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import data from '../../../data/safety.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.info(req, { depth: null });
  // handle requests with GET method and path /api/safety
  if (req.method === 'GET' && req.url === '/api/safety') {
    return res.status(200).json('/api/safety');
  }
}
