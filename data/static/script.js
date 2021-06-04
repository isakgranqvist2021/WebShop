async function getData() {
    const result = await fetch('http://localhost:3151/data');
    return await result.json();
}

function imgstuff(img) {
    try {
        return img.imageURL;
    } catch (err) {
        return '';
    }
}

async function saveImages(p, color) {
    let imgTags = Array.from(p.parentNode.querySelectorAll('img'));

    return await Promise.all(imgTags.map(async (img) => {
        let fd = new FormData();
        let response = await fetch(img.src);
        let b = await response.blob();
        let f = new File([b], img.src, { type: b.type });
        fd.append('img', f);

        response = await fetch('http://localhost:3000/admin/add-product/upload-img', {
            method: 'POST',
            body: fd
        });

        let result = await response.json();
        return {
            color: color + ' variant',
            img: {
                src: result.data.filename,
                alt: color + ' variant'
            }
        };
    }));
}

async function save(p) {
    let product = {
        title: p.parentNode.querySelector('.title').value,
        price: p.parentNode.querySelector('.price').value,
        description: [p.parentNode.querySelector('.description').textContent],
        product_collection: p.parentNode.querySelector('.product_collection').value,
        on_sale: p.parentNode.querySelector('.on_sale').checked,
        on_sale_percentage: p.parentNode.querySelector('.percentage').value || 0,
        variants: await saveImages(p, p.parentNode.querySelector('.color').value)
    };

    const response = await fetch('http://localhost:3000/admin/add-product', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: { 'Content-Type': 'application/json' }
    })
    let result = await response.json();
    alert(result.message);
}

function draw(data, filter) {
    document.querySelector('#result')
        .innerHTML = `${data.map(dp => {
            let desc = dp.productDescriptors.description != undefined ? dp.productDescriptors.description.value : ''
            if (dp.articleType.typeName.toLowerCase() === filter.toLowerCase()) {
                return ` 
                <div class="product">
                    <label>Title</label>
                    <input class="title" value="${dp.productDisplayName}">
                    <label>Price</label>
                    <input class="price" value="${Math.ceil(dp.price * 0.011)}">
                    <label>Color</label>
                    <input class="color" value="${dp.baseColour}">
                    <label>Collection</label>
                    <input class="product_collection" value="${dp.articleType.typeName}">
                    <label>Description</label>
                    <div class="description" contenteditable="true">${desc}</div>
    
                    <div class="images">
                        <img src="${imgstuff(dp.styleImages.back)}">
                        <img src="${imgstuff(dp.styleImages.front)}">
                        <img src="${imgstuff(dp.styleImages.default)}">
                    </div>

                    <div class="fg">
                        <label>On Sale</label>
                        <input class="on_sale" type="checkbox">
                    </div>

                    <label>Percentage Reduction</label>
                    <input class="percentage" type="number">
                    
                    <button onclick="save(this)">Add To Store</button>
                </div>`
            }

        }).join('')}`
}

window.onload = async () => {
    const res = await getData();

    let select = document.querySelector('#select-collection')
    res.collections.forEach(collection => {
        let option = document.createElement('option');
        option.textContent = collection;
        option.value = collection;
        select.appendChild(option);
    });

    select.addEventListener('change', (e) => draw(res.products, e.target.value));

    draw(res.products, res.collections[0]);
}