import fetch from 'node-fetch';
import getCollections from '../config/page/collections';
import fs from 'fs';
import * as cheerio from 'cheerio';

import productMethods from '../models/product/product.methods';

let collections = getCollections().collections.map(obj => obj.label);
collections[0] = 'clothes';
collections[collections.length - 1] = 'cheap stuff';

// collections.shift(); // remove 'all' from the array
// collections.pop(); // remove 'on_sale' from the array

let outputHTML = [];

function getUrl(keywords) {
    return `https://www.google.com/search?q=${keywords.map(kw => kw).join('+')}&hl=en&sxsrf=ALeKk00gQDBQwS5F-UayJCXoFmYPSec5WQ:1621592042056&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjok4yNxdrwAhVCw4sKHdINAHUQ_AUoAXoECAEQAw&biw=1920&bih=1089`
}

async function fetchImages(url) {
    const imgClass = "t0fcAb";

    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                let $ = cheerio.load(html);
                let dom = $(`img[class="${imgClass}"]`);
                let output = [];

                for (let key in dom) {
                    if (dom[key].attribs) {
                        outputHTML.push(`<img src="${dom[key].attribs.src}">`);
                        output.push(dom[key].attribs.src);
                    }
                }

                return resolve(output, outputHTML);

            }).catch(err => reject(err));
    })
}

function startAdding(write_output, save_to_db) {
    // addProduct(undefined, false);
    let combineWith = ['comfortable', 'cool', 'nice', 'cheap', 'popular'];
    let colors = ['red', 'blue', 'orange', 'black', 'white', 'dark blue', 'yellow', 'lightblue']
    let onSale = new Array(95).fill(0); // 5 percent chance of being on sale :o
    onSale.push(...[1, 1, 1, 1, 1]);

    collections.forEach(collection => {
        let keyword = combineWith[Math.floor(Math.random() * combineWith.length)];

        colors.forEach(color => {
            let url = getUrl([keyword, color, 'mens', collection]);

            fetchImages(url)
                .then(images => {

                    images.forEach(img => {

                        let product = {
                            title: `${keyword} ${color} ${collection}`,
                            product_collection: collection,
                            price: Math.round(Math.floor(Math.random() * 100)) + .99,
                            on_sale: onSale[Math.floor(Math.random() * onSale.length)] === 0 ? false : true,
                            description: [
                                'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
                                'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
                                'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.'
                            ],
                            variants: [
                                {
                                    color,
                                    img: {
                                        src: img,
                                        alt: `${keyword} ${color} ${collection}`
                                    }
                                }
                            ]
                        }

                        if (save_to_db) {
                            productMethods.saveProduct(product)
                                .then(result => {
                                    console.log('added', result._id);
                                }).catch(err => console.log(err));
                        }

                        if (write_output) {
                            fs.writeFileSync('htmlfile.html', outputHTML.join('').toString())
                        }
                    });


                }).catch(err => console.log('could not find any images'));
        });
    });
}


export default startAdding;