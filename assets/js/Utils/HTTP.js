const serverAddr = 'http://localhost:3000';

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

async function POST() {

}

export default { GET, POST };

