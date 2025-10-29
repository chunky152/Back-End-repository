const dotenv = require('dotenv');
const mongoose = require('mongoose');


dotenv.config();

describe('MongoDB connection', () => {
	beforeAll(async () => {
		const uri = process.env.MONGO_URI;
		if (!uri) throw new Error('MONGO_URI not set in .env');
		await mongoose.connect(uri);
	}, 20000);

	it('should connect to MongoDB and have readyState = 1', () => {
		expect(mongoose.connection.readyState).toBe(1);
	});

	afterAll(async () => {
		await mongoose.disconnect();
	});
});
