const path = require('path')
require('custom-env').env(true,path.join(__dirname, '..'));

const nconf = require('nconf');

nconf.argv()
    .env()
    .file( { file: path.join(__dirname,'..','appConfig.json')} );

nconf.set('APP:PORT', nconf.get('PORT'))
nconf.set('APP:APP_BASE_URL', nconf.get("APP_BASE_URL"))
nconf.set('APP:MONGODB_URI', nconf.get("MONGODB_URI"))
nconf.set('APP:MAX_ITEMS_PER_PAGE', nconf.get('MAX_ITEMS_PER_PAGE'))
