import fetch from 'node-fetch';
const serverAddr = 'http://localhost:3000'

function qs(obj) {
    let str = Object.keys(obj).map(k => {
        return `${k}=${obj[k]}`;
    }).filter(val => val != undefined);


    return str.join('&')
}

async function HTTP(config) {
    return fetch(`${serverAddr}${config.url}`, {
        method: config.method,
        body: config.body,
        headers: {
            'Content-Type': config.contentType
        }
    })
}

export default { qs, HTTP, serverAddr };