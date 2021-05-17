import express from 'express';
import config from './config/config';
import expressEjsLayouts from 'express-ejs-layouts';
import path from 'path';

const app = express();

import index from './controllers/index';
import users from './controllers/users';

app.set('view engine', 'ejs');
app.set('views', path.join(path.dirname('./'), 'views'));
app.use(expressEjsLayouts);
app.use('/public', express.static('public'));
app.use('/assets', express.static('node_modules/bootstrap'));
app.use('/', index);
app.use('/users', users);

app.listen(config.PORT, function () {
    console.log('Server listening on', config.PORT);
});