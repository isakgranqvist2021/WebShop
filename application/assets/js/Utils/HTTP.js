const serverAddr = 'https://fantastic-invention.herokuapp.com';

async function GET(url) {
    try {
        const response = await fetch(serverAddr + url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        return await response.json();
    } catch (err) {
        Promise.reject(err);
    }
}

async function POST(url, body, headers) {
    try {
        const response = await fetch(serverAddr + url, {
            method: 'POST',
            body: body,
            headers
        });

        return await response.json();
    } catch (err) {
        Promise.reject(err);
    }
}

export default { GET, POST };

