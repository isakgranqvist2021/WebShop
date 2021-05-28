import fetch from 'node-fetch';
import getCollections from '../config/page/collections';
import faker from 'faker';
import scrapeImages from './get-images';

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

async function addProduct(n, save) {
    for (let i = 0; i < n; i++) {
        let product_collection = collections[Math.floor(Math.random() * collections.length)];

        let product = {
            title: faker.commerce.productName(),
            product_collection,
            price: parseInt(faker.commerce.price(5, 10)) + .99,
            on_sale: onSale(95),
            description: new Array(Math.ceil(Math.random() * 5)).fill(0).map(_ => faker.commerce.productDescription()),
            variants: [
                await newVariant(product_collection, faker.commerce.color()),
                await newVariant(product_collection, faker.commerce.color()),
                await newVariant(product_collection, faker.commerce.color()),
                await newVariant(product_collection, faker.commerce.color())
            ]
        }

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
}

// how many products to add, save them to database?
addProduct(50, true);