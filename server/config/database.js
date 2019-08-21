// This module constrcuts the database connections
// <--- Modules --->
const mongoose = require('mongoose'); // imports mongoose for server connection
const fs = require('fs'); // file-system to load, read and require all model files
const path = require('path'); // utilize path for easy dir/file joining
const modelsPath = path.resolve('server', 'models'); // Dir where our models are located
const reg = new RegExp('\\.js$', 'i'); // REGEX for .js extension
const db = 'mongodb://localhost/tasks'; // URL for DB connection

// <--- DB Settings --->
mongoose.connect(db, {useNewUrlParser: true}); // connect to the DB
mongoose.Promise = global.Promise; // override mongose pormises with express promises

// <--- DB Connection Events --->
// ** Successful Connection **
mongoose.connection.on('connected', () => {
    console.log(`Mongoose default connection open to ${ db}`);
});

// ** Error on Connection **
mongoose.connection.on('error', err => {
    console.log(`Mongoose default connection error: ${ err }`);
    process.exit(0); // kills DB connection
});

// ** Connection Disconnect **
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose default connection interrupted');
})

// ** Node process end => disconnect Mongoose **
process.on('SIGINT', () => {
    mongoose.connection.close( () => {
        console.log('Mongoose default connection disconnecte through program termination');
        process.exit(0); // kills DB connection
    });
});

// <--- Model Connection --->
// iterate through all .js files in the model path (/server/models/..) and require
fs.readdirSync(modelsPath).forEach(file => {
    // REGEX test for file .js extension
    if(reg.test(file)) {
        require(path.join(modelsPath, file)); // require file (model)
    }
})
