const mongoose = require('mongoose');


const connectDB = async () => {	

	const GlobalConfig = require('../config');

	const config = (new GlobalConfig()).getConfig();

	const { MONGODB_URI, DATABASE_NAME } = config;
	
  return mongoose.connect(`${MONGODB_URI}/${DATABASE_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true });

};

mongoose.connection.on('error', err => {

    console.log('MONGODB CONNECTION ERROR: ', err.message);    

});


module.exports = connectDB;