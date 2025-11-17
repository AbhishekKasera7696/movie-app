// api/proxy.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  try {
    // Your EC2 backend URL
    const BACKEND = process.env.BACKEND_URL || 'http://13.204.47.170:3000';

    // Construct the target URL by stripping "/api" from request path
    const targetUrl = `${BACKEND}${req.url.replace(/^\/api/, '')}`;

    // Forward headers (like Authorization)
    const headers = {};
    for (const [k, v] of Object.entries(req.headers)) {
      if (k.toLowerCase() === 'host') continue; // skip host header
      headers[k] = v;
    }

    const backendRes = await fetch(targetUrl, {
      method: req.method,
      headers,
      body: ['GET','HEAD'].includes(req.method) ? undefined : req.body,
      redirect: 'follow',
    });

    const body = await backendRes.buffer();
    res.status(backendRes.status);
    backendRes.headers.forEach((val, key) => {
      if (key.toLowerCase() === 'transfer-encoding') return;
      res.setHeader(key, val);
    });

    res.send(body);
  } catch (err) {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Proxy error' });
  }
}
