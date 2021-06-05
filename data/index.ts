import express from 'express';
import getData from './get-data';
import view from './view';

const app: express.Express = express();

const args: string[] = process.argv.slice(2, process.argv.length);

app.use(express.json());
app.use('/static', express.static('static/'));

app.get('/', view);
app.get('/data', getData);

const PORT: Number = 3151;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));