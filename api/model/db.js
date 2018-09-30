import mongoose from 'mongoose';
import chalk from 'chalk';

var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;

export const connectToDb = function(){
    const dbUrl = process.env.DB_URL;

    mongoose.connect(dbUrl, { useNewUrlParser: true });
    mongoose.connection.on('disconnected', function(){
        console.log(disconnected("Mongoose default connection is disconnected"));
    });

    process.on('SIGINT', function(){
        mongoose.connection.close(function(){
            console.log(termination("Mongoose default connection is disconnected due to application termination"));
            process.exit(0);
        });
    });

    return new Promise((resolve, reject) => {
        mongoose.connection.on('connected', function(){
            console.log(connected(`Mongoose default connection is open to ${dbUrl}`));
            resolve();
        });

        mongoose.connection.on('error', function(err){
            console.log(error(`Mongoose default connection has occured ${err} error`));
            reject(err);
        });
    });

};