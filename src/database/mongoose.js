const mongoose = require('mongoose');
const nconf = require('nconf');

const config = nconf.get('APP');

const MONGODB_URI = config.MONGODB_URI;

const DATABASE_NAME = config.DATABASE_NAME;


const connectDB = async () => {	
    return mongoose.connect(`${MONGODB_URI}/${DATABASE_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true });

};

mongoose.connection.on('error', err => {

    console.log('MONGODB CONNECTION ERROR: ', err.message);    

});


module.exports = connectDB;