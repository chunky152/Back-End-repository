import { config } from 'dotenv';
import { connect, connection, disconnect } from 'mongoose';

config();

describe('MongoDB connection', () => {
	beforeAll(async () => {
		const uri = process.env.MONGO_URI;
		if (!uri) throw new Error('MONGO_URI not set in .env');
		await connect(uri);
	}, 20000);

	it('should connect to MongoDB and have readyState = 1', () => {
		expect(connection.readyState).toBe(1);
	});

	afterAll(async () => {
		await disconnect();
	});
});
