import express, { Request, Response } from 'express';
import axios from 'axios';

const app = express();
const client_id = 'YOUR_CLIENT_ID';
const client_secret = 'YOUR_CLIENT_SECRET';

app.get('/search/blog', async (req: Request, res: Response) => {
    const query = req.query.query as string;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }

    const api_url = 'https://openapi.naver.com/v1/search/blog';
    
    try {
        const response = await axios.get(api_url, {
            params: { query: encodeURI(query) },
            headers: {
                'X-Naver-Client-Id': client_id,
                'X-Naver-Client-Secret': client_secret
            }
        });

        res.status(200).json(response.data);
    } catch (error: any) {
        // TypeScript 4.4+ requires type assertions for error handling
        console.error('Error:', error.response ? error.response.status : error.message);
        res.status(error.response ? error.response.status : 500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(3000, () => {
    console.log('Server running at http://127.0.0.1:3000/search/blog?query=검색어');
});
