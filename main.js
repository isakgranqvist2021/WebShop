import express from 'express';
import config from './config/config'; // contains server config such as port and database uri
import expressEjsLayouts from 'express-ejs-layouts'; // a small modification to the ejs template engine
import path from 'path'; // allows server to easily work with system paths and directories
import mongoose from 'mongoose'; // makes it easier to work with mongodb
import session from 'express-session'; // makes managing sessions easier
import MongoStore from 'connect-mongo'; // save session data in mongodb
import authMiddleware from './config/auth.mw'; // auth middlewares
import configMiddleware from './config/config.mw'; // attach config object to request object
import dotenv from 'dotenv'; // .env variables

dotenv.config(); // initialize .env
const app = express(); // initialize express

import index from './routers/index'; // every route that can be accessed without authorization
import users from './routers/users'; // every route that can only be accessed with authorization


/* connect to mongodb */
mongoose.connect(config.DB_URI, {
    useNewUrlParser: true, // current URL string parser is deprecated, and will be removed in a future version. 
    useUnifiedTopology: true, // Current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version.
    useCreateIndex: true
}, function (err) { // check if an error has occured
    if (err) // if error then exit the application
        process.exit(1);

    console.log('MongoDB has connected');
});


/* configure server to handle sessions */
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: config.DB_URI
    }),
    cookie: {
        maxAge: 60000 * 60 * 60, // how long should the cookie be alive for if left alone? in milliseconds
        path: '/',
        sameSite: 'strict', // only allow requests from the same origin as the server
        httpOnly: true, // can the cookie be accessed by client-side javascript? true = false :o
        secure: process.env.NODE_ENV === 'production' // should the cookie accessible over the HTTP protocol or only HTTPS?
    }
}));


/* file parsing setup */
app.use(express.json({
    extended: true // should the server be allowed to parse nested objects
})); // allow server to parse json data

app.use(express.urlencoded({
    extended: false // should the server be allowed to parse nested objects
})); // allow server to parse form data


/* view engine setup - responsible for the views folder */
app.set('view engine', 'ejs'); // set ejs as the view engine
app.set('views', path.join(path.dirname('./'), 'views')); // set the folder where the views will be stored
app.use(expressEjsLayouts); // enable ejs layout - extend a single layout file


/* static files setup - responsible for the public folder */
app.use('/public', express.static('public')); // set the folder where public files will be served from
app.use('/assets', express.static('node_modules/bootstrap')); // where bootstrap is loaded from


app.use('*', configMiddleware.setupConfig);


/* router setup - responsible for the controllers folder */
app.use('/', authMiddleware.hasNotAuth, index); // every route that can be accessed without authorization
app.use('/users', authMiddleware.hasAuth, users); // every route that can only be accessed with authorization


app.listen(config.PORT, function () { // start server and listen for incomming http requests
    console.log('Server listening on', config.PORT);
});