import * as http from 'http';
import { getManager } from 'typeorm';
import { IndexPageDatas } from './models/index.entity';

interface ErrnoException extends Error {
	errno?: number;
	code?: string;
	path?: string;
	syscall?: string;
	stack?: string;
}

export async function adminCreator() {
	const managerList = await getManager().find(IndexPageDatas, {
		where: {
			langCode: 'tr',
		},
	});
	if (managerList.length > 0) {
		console.log('İlk içerik oluşturulmuş.');
	} else {
		await getManager().insert(IndexPageDatas, {
			langCode: 'tr',
			title: 'İlk tanılama',
			content: 'İlk tanılama verisi',
			info: { col1: 'Birincil kolon', col2: 'İkincil kolon', col3: 'üçüncül kolon' },
		});
	}
}

export function httpServerErrorHandling(error: ErrnoException, port: string) {
	if (error.syscall !== 'listen') throw error;
	const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' olarak atanan port kullanımda.');
			process.exit(1);
			break;
		default:
			throw error;
	}
}

export function onListening(server: http.Server, port: string) {
	const addr = server.address();
	const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + port;

	console.log('Listening on ' + bind);
}
