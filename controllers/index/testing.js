import productMethods from '../../models/product.model';
import variantMethods from '../../models/variant.model';
import imageMethods from '../../models/image.model';

async function addProduct(req, res) {

    //const result = await productMethods.saveProduct(req.body);

    for (let i = 0; i < req.body.variants.length; i++) {
        req.body.variants[i].img = await imageMethods.saveImage(req.body.variants[i].img);
        req.body.variants[i] = await variantMethods.saveVariant(req.body.variants[i]);
    }

    const result = await productMethods.saveProduct(req.body);

    res.json({ result });

}

async function findProducts(req, res) {
    let products = await productMethods.findProducts({ product_collection: 'all' });

    res.json(products);
}

/*

{
    title: `Fantastic Shirt`,
    product_collection: 'Shirts',
    price: 49.99,
    on_sale: false,
    description: [
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
        'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.'
    ],
    variants: [
        { 
            color: 'Red', 
            img: {
                src: 'https://luksusbaby.com/images/zadig-og-voltaire-tshirt-tee-shirt-brigh-red-roed-x25171-997-2-p.jpg',
                alt: 'Red Shirt Variant'
            }
        },
        {
            color: 'Purple',
            img: {
                src: 'https://imgprd19.hobbylobby.com/3/36/87/336871a6a21105a88dd36577c23c7ea6b4a25408/700Wx700H-1449792-111419.jpg',
                alt: 'Purple Shirt Variant'
            }
        }
    ]
}

*/

export default { addProduct, findProducts };