import { createServer } from 'http';
import { adminCreator, httpServerErrorHandling, onListening } from './app.functs';
import { createConnection } from 'typeorm';
import * as express from 'express';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';

console.log('Server starting.');
const app = express();

/**
 * ? Sunucu ayaları vs.
 */
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(
	express.urlencoded({
		extended: false,
	}),
);

//* Routes modülleri
import IndexRouter from './routes/index.routes';

//* Varlık modülleri
import { IndexPageDatas } from './models/index.entity';

// ! CORS için development bitince kaldırılacaktır.
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,credentials');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	next();
});

/**
 * ? Tüm yönlendirme dosyalarını bir yol atadığımız yer.
 */
app.use('/', IndexRouter);

(() => {
	console.log('Database connection start.');
	createConnection({
		type: 'postgres',
		host: process.env.DB_NAME,
		port: 5432,
		username: 'postgres',
		password: process.env.DB_PASS,
		database: 'example',
		entities: [IndexPageDatas],
		synchronize: true,
	})
		.then(async () => {
			adminCreator();
			const port = process.env.PORT || '3000';
			app.set('port', port);
			const server = createServer(app);
			server.listen(port);
			server.on('error', (error) => httpServerErrorHandling(error, port));
			server.on('listening', () => onListening(server, port));
		})
		.catch((error) => console.log(error));
})();
