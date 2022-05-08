import { Router } from 'express';
import * as express from 'express';

const IndexRouter = Router();

IndexRouter.get('/', express.static('public/index.html'));

IndexRouter.get('/api/index-data', async (_req, res, _next) => {
	res.send('Hello 👋');
});

export default IndexRouter;
