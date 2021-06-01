import fetch from 'node-fetch';
import getCollections from '../config/page/collections';
import scrapeImages from './get-images';
import fs from 'fs';

let collections = getCollections().collections.map(obj => obj.label);
collections.shift();
collections.pop();

function onSale(probability) {
    const values = new Array(probability).fill(0)
        .push(...new Array(100 - probability).fill(1));

    return values[Math.floor(Math.random() * values.length)] != 0;
}

async function newVariant(product_collection, color) {
    let image = await scrapeImages([product_collection, color])

    return {
        color: color,
        img: {
            src: image,
            alt: 'Product Image'
        }
    }
}

async function addProduct(product, save) {
    if (save) {
        fetch('http://localhost:3000/add-product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        }).then(response => response.json())
            .then(response => console.log('saved:', response.result._id));
    }
}


// only add 1000 products at a time to prevent call stack exceeded error
fs.readFile('./data/output.json', 'utf-8', (err, data) => {
    if (err) console.log(err);
    let products = JSON.parse(data);
    products.slice(1000, 2000).forEach(product => {
        addProduct(product, true);
    });
});


