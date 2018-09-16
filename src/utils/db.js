import mongoose from 'mongoose';
import logger from './logger'

mongoose.Promise = global.Promise;
console.log(process.env.DB_USER);
const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds157742.mlab.com:57742/bitcontact`
const dev = "dev"
const connection = mongoose.connect(uri);

connection
	.then(db => {
		logger.info(
			`Successfully connected to ${uri} MongoDB cluster in ${
			env
			} mode.`,
		);
		return db;
	})
	.catch(err => {
		if (err.message.code === 'ETIMEDOUT') {
			logger.info('Attempting to re-establish database connection.');
			mongoose.connect(uri);
		} else {
			logger.error('Error while attempting to connect to database:');
			logger.error(err);
		}
	});

export default connection;
