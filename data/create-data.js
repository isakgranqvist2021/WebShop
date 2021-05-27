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

function addProduct(n, save) {
    for (let i = 0; i < n; i++) {
        let product = {
            title: faker.commerce.productName(),
            product_collection: collections[Math.floor(Math.random() * collections.length)],
            price: parseInt(faker.commerce.price(5, 10)) + .99,
            on_sale: onSale(95),
            description: new Array(Math.ceil(Math.random() * 5)).fill(0).map(_ => faker.commerce.productDescription()),
            variants: new Array(Math.ceil(Math.random() * 5)).fill(0).map(_ =>
            ({
                color: faker.commerce.color(),
                img: null
            }))
        }

        product.variants.forEach((variant, i) => {
            variant.img = {
                src: scrapeImages([product.product_collection, variant.color]),
                alt: `variant ${i + 1}`
            };
        });

        //console.log(product.variants);

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

addProduct(10, false);