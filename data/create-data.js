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

async function addProduct(product, save) {
    // let product_collection = collections[Math.floor(Math.random() * collections.length)];
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

// product data, save them to database?
[
    {
        title: 'Woolen Hat',
        product_collection: 'Hats',
        price: 6.99,
        on_sale: false,
        description: [
            'Trendy Men\'s Casual Fedora Hat Panama Cap Korean Style Male Autumn Winter Outdoor Soft Warm Woolen Hat Top Hat Fashion Accessories'
        ],
        variants: [
            {
                color: 'Coffe',
                img: { src: 'https://canary.contestimg.wish.com/api/webimage/59ccc4244671c17bccdb8a36-1-large.jpg', alt: 'Coffe Variant' }
            },
            {
                color: 'Gray',
                img: { src: 'https://canary.contestimg.wish.com/api/webimage/59ccc4244671c17bccdb8a36-3-large.jpg', alt: 'Gray Variant' }
            },
            {
                color: 'Navy Blue',
                img: { src: 'https://canary.contestimg.wish.com/api/webimage/59ccc4244671c17bccdb8a36-10-large.jpg', alt: 'Navy Blue Variant' }
            }
        ]
    }
].forEach(product => {
    addProduct(product, true);
});
