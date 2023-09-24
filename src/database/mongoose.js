const mongoose = require('mongoose');
const nconf = require('nconf');

const config = nconf.get('APP');

const MONGODB_URI = config.MONGODB_URI;


const connectDB = async () => {	
    return mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

};

mongoose.connection.on('error', err => {

    console.log('MONGODB CONNECTION ERROR: ', err.message);    

});


module.exports = connectDB;