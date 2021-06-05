import express from 'express';
import fs from 'fs';

function getData(req: express.Request, res: express.Response): express.Response {
    let d: any[] = [];
    let files: string[] = fs.readdirSync('./data');
    let collections: string[] = [];

    files.slice(0, 100).forEach(fn => {
        let raw = fs.readFileSync('./data/' + fn);
        d.push(JSON.parse(raw.toString()).data);
        collections.push(JSON.parse(raw.toString()).data.articleType.typeName)
    });

    let used: string[] = new Array();
    let unique: string[] = new Array();

    collections.forEach((el: string) => {
        if (!used.includes(el)) {
            used.push(el);
            unique.push(el);
        }
    });

    return res.json({
        products: d,
        collections: unique
    });
}

export default getData;