const path = require('path')
require('custom-env').env(true,path.join(__dirname, '..'));

const nconf = require('nconf');

nconf.argv()
    .env()
    .file( { file: path.join(__dirname,'..','appConfig.json')} );

nconf.set('APP:PORT', nconf.get('PORT'));
nconf.set('APP:APP_BASE_URL', nconf.get("APP_BASE_URL"));
nconf.set('APP:MONGODB_URI', nconf.get("MONGODB_URI"));
nconf.set('APP:DATABASE_NAME', nconf.get("DATABASE_NAME"));
nconf.set('APP:TOKEN_SECRET_STRING', nconf.get('TOKEN_SECRET_STRING'));
nconf.set('APP:COOKIES_SECRET_STRING', nconf.get('COOKIES_SECRET_STRING'));
nconf.set('APP:MAX_ITEMS_PER_PAGE', nconf.get('MAX_ITEMS_PER_PAGE'));
nconf.set('APP:AUTH_METHOD_SESSION_TOKEN', nconf.get('AUTH_METHOD_SESSION_TOKEN'));
nconf.set('APP:RATE_LIMIT_WINDOW_SECONDS', nconf.get('RATE_LIMIT_WINDOW_SECONDS'));
nconf.set('APP:AUTH_USERS_RATE_LIMIT', nconf.get('AUTH_USERS_RATE_LIMIT'));
nconf.set('APP:ANONYMOUS_USERS_RATE_LIMIT', nconf.get('ANONYMOUS_USERS_RATE_LIMIT'));
nconf.set('APP:RESET_TOKEN_EXPIRATION_SECONDS', nconf.get('RESET_TOKEN_EXPIRATION_SECONDS'));
