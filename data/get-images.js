import fetch from 'node-fetch';
import cheerio from 'cheerio';
import fs from 'fs';

async function scrapeImages(keywords) {
    let url = `
    https://www.google.com/search
    ?q=${keywords.map(kw => kw).join('+ ')}
    &sxsrf=ALeKk032SVfmYyTEF5fp_s8RvQF4OXjsAw:1622153912778
    &source=lnms&tbm=isch&sa=X&ved=2ahUKEwibyfed8urwAhUipIsKHXJIB1IQ_AUoAXoECAEQAw&biw=1920
    &bih=1089`;

    return fetch(url.trim().replace(/\s/g, ''), {
        method: 'GET'
    }).then(response => response.text())
        .then(html => parseHTML(html));
}


function parseHTML(html) {
    let regex = /https:\/\/encrypted-tbn0\.gstatic\.com\/images\?q=tbn:.*&s/g;
    let parsedHTML = cheerio.load(html);
    let imagesRaw = parsedHTML('img');
    let output = [];

    for (let key in imagesRaw) {
        let isOK = imagesRaw[key].attribs != undefined && regex.test(imagesRaw[key].attribs.src);

        if (isOK) {
            output.push(imagesRaw[key].attribs.src);
        }
    }

    // write output to a html file
    fs.writeFileSync(`file.html`, output.map(src => `<img src="${src}">`).join('').toString());

    return output[0];
}

export default scrapeImages;