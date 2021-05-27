import fetch from 'node-fetch';
import cheerio from 'cheerio';

function scrapeImages(keywords) {
    let url = '\
    https://www.google.com/search' +
        `?q=${keywords.map(kw => kw).join('+ ')}` +
        '&sxsrf=ALeKk032SVfmYyTEF5fp_s8RvQF4OXjsAw:1622153912778\
    &source=lnms&tbm=isch&sa=X&ved=2ahUKEwibyfed8urwAhUipIsKHXJIB1IQ_AUoAXoECAEQAw&biw=1920\
    &bih=1089';

    //console.log(url.trim().replace(/\s/g, ''))

    fetch(url.trim().replace(/\s/g, ''), {
        method: 'GET'
    }).then(response => response.text())
        .then(response => console.log(response));

    return 'someurl.jpg';

}


export default scrapeImages;