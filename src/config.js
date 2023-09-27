const path = require('path');
const nconf = require('nconf');
const awsUtils = require('./utils/aws');
const connectDB = require('./database/mongoose');

require('custom-env').env(true,path.join(__dirname, '..'));

nconf.argv()
			.env()
			.file( { file: path.join(__dirname,'..','appConfig.json')} );

const nodeEnv = nconf.get('NODE_ENV') || 'development';

const isProd = nodeEnv === 'production';

class GlobalConfig {
	static instance;
	appConfig;

	constructor () {

		if (!!GlobalConfig.instance) {
			return GlobalConfig.instance;
		}

		GlobalConfig.instance = this;

	}

	async loadConfig() {
	
		let awsSecrets;

		if (isProd)  {
			// In Production, the App is running in AWS EC2 Instance, and will get the Secrets from AWS Secrets Manager.
			awsSecrets = await awsUtils.getSecretValue('playg/api/secrets');
		
			awsSecrets = JSON.parse(awsSecrets);
		}		
				
		const appConfig = {
			PORT: nconf.get('PORT'),
			APP_BASE_URL: nconf.get("APP_BASE_URL"),
			MONGODB_URI: isProd ? awsSecrets.MONGODB_URI : nconf.get("MONGODB_URI"),
			DATABASE_NAME: nconf.get('DATABASE_NAME'),
			TOKEN_SECRET_STRING: isProd ? awsSecrets.TOKEN_SECRET_STRING : nconf.get('TOKEN_SECRET_STRING'),
			COOKIES_SECRET_STRING: isProd ? awsSecrets.COOKIES_SECRET_STRING : nconf.get('COOKIES_SECRET_STRING'),
			MAX_ITEMS_PER_PAGE: nconf.get('MAX_ITEMS_PER_PAGE'),
			AUTH_METHOD_SESSION_TOKEN: nconf.get('AUTH_METHOD_SESSION_TOKEN'),
			RATE_LIMIT_WINDOW_SECONDS: nconf.get('RATE_LIMIT_WINDOW_SECONDS'),
			AUTH_USERS_RATE_LIMIT: nconf.get('AUTH_USERS_RATE_LIMIT'),
			ANONYMOUS_USERS_RATE_LIMIT: nconf.get('ANONYMOUS_USERS_RATE_LIMIT'),
			RESET_TOKEN_EXPIRATION_SECONDS: nconf.get('RESET_TOKEN_EXPIRATION_SECONDS')
		}
		
		this.appConfig = appConfig

		await connectDB(); // Take advantage of the Async Function at Start and Connect to MongoDB Database.
	}
	
	getConfig() {

		return this.appConfig;

	}


	get instance() {
		return GlobalConfig.instance;
	}
}

module.exports = GlobalConfig;


