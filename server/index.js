// import required packages
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from 'config';

const cors = require('cors');

// import routers
import Routes from './routes';

// define express app
const app = express();

const corsOptions = {
    origin: config.cors_urls,
    credentials: true
};

app.use(cors(corsOptions));

// connect to mongodb
mongoose.connect(`${config.database.mongodb.host}:${config.database.mongodb.port}/${config.database.mongodb.name}`, { useNewUrlParser: true });

// mongoose promise deprecated. So, we use global
mongoose.Promise = global.Promise;

// log request activities as middleware. All the requests wil be print into the console.
app.use(morgan('dev'));

// inform that we are going to use body-parser
// urlencoded - this type of body will be convert
// extended - which need to allow rich data or simple data
app.use(bodyParser.urlencoded({
    extended: true
}));
// body-parser use to convert http post data to json
app.use(bodyParser.json());

// Routes
Routes(app);

/*
 * Error handling for undefined route requests
 */
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// catch thrown errors and return to user
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message,
            status: error.status
        }
    });
});

// define a port unless not defined as a environment variable
const port = process.env.PORT || config.server_port;

// listening to the defined port
app.listen(port, () => {
    console.log('Server listing to the port: ' + port);
});

module.exports = app;