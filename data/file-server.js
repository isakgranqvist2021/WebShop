const express = require('express');
const fs = require('fs');
const app = express();

const args = process.argv.slice(2);
const n = parseInt(args[0]) || 100;

app.use(express.json({ extended: false }));
app.use('/static', express.static('static/'));

app.get('/', (req, res) => {
    res.sendFile('display.html', { root: './' })
});

app.get('/data', (req, res) => {
    let d = [];
    let files = fs.readdirSync('./data');
    let collections = [];

    files.slice(0, n).forEach(fn => {
        let raw = fs.readFileSync('./data/' + fn);
        d.push(JSON.parse(raw.toString()).data);
        collections.push(JSON.parse(raw.toString()).data.articleType.typeName)
    });

    return res.json({
        products: d,
        collections: [...new Set(collections)]
    });
});

const PORT = 3151;
app.listen(PORT, () => console.log(`displaying ${n} products at - http://localhost:${PORT}`));