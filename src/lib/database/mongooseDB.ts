import { connect } from 'mongoose';
import config from 'config';

// console.log();

export async function connectDB() {
	try {
		const MONGODB_URI = config.get<string>('MONGODB_URI');

		await connect(MONGODB_URI);
		console.log('Database connected.....');
	} catch (err) {
		console.error(`Could not connect to MongoDB, ${err}`);
		process.exit(1);
	}
}
