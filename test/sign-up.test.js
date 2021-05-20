import assert from 'assert';
import fetch from 'node-fetch';

const serverAddr = 'http://localhost:3000'

function qs(exclude, obj) {
    let str = Object.keys(obj).map(k => {
        if (exclude != k)
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

describe('User Sign Up Through Form', () => {
    let user = {
        email: 'peter-smith@gmail.com',
        first_name: 'peter',
        last_name: 'smith',
        password: 'password12345',
        confirm_password: 'password12345'
    }

    it('sign up without body', async () => {
        let result = await HTTP({
            url: '/sign-up/form-auth',
            method: 'POST',
            contentType: 'application/x-www-form-urlencoded'
        });

        assert.strictEqual(result.url, serverAddr + '/sign-up?err=missing%20body');
    });

    it('sign up without auth type', async () => {
        let result = await HTTP({
            url: '/sign-up',
            method: 'POST',
            body: qs('', user),
            contentType: 'application/x-www-form-urlencoded'
        });
        assert.strictEqual(result.statusText, 'Not Found');
    });

    it('sign up with wrong authtype', async () => {
        let result = await HTTP({
            url: '/sign-up/wrongauth',
            method: 'POST',
            body: qs('', user),
            contentType: 'application/x-www-form-urlencoded'
        });

        assert.strictEqual(result.url, serverAddr + '/sign-up?err=auth%20type%20does%20not%20exist');
    });

    it('sign up with wrong authtype', async () => {
        let result = await HTTP({
            url: '/sign-up/12345',
            method: 'POST',
            body: qs('', user),
            contentType: 'application/x-www-form-urlencoded'
        });

        assert.strictEqual(result.url, serverAddr + '/sign-up?err=auth%20type%20does%20not%20exist');
    });

    it('sign up with wrong authtype', async () => {
        let result = await HTTP({
            url: '/sign-up/_qw+-/2tqwt2',
            method: 'POST',
            body: qs('', user),
            contentType: 'application/x-www-form-urlencoded'
        });

        assert.strictEqual(result.statusText, 'Not Found');
    });

    it('sign up without email', async () => {
        let result = await HTTP({
            url: '/sign-up/form-auth',
            method: 'POST',
            body: qs('email', user),
            contentType: 'application/x-www-form-urlencoded'
        });

        assert.strictEqual(result.url, serverAddr + '/sign-up?err=missing%20email');
    });

    it('sign up with bad email', async () => {
        let result = await HTTP({
            url: '/sign-up/form-auth',
            method: 'POST',
            body: qs('', {
                email: 'something@',
                first_name: user.full_name,
                last_name: user.last_name,
                password: user.password,
                confirm_password: user.confirm_password
            }),
            contentType: 'application/x-www-form-urlencoded'
        });

        assert.strictEqual(result.url, serverAddr + '/sign-up?err=email%20not%20approved');
    });

    it('sign up without first_name', async () => {
        let result = await HTTP({
            url: '/sign-up/form-auth',
            method: 'POST',
            body: qs('first_name', user),
            contentType: 'application/x-www-form-urlencoded'
        });

        assert.strictEqual(result.url, serverAddr + '/sign-up?err=missing%20first%20name');
    });

    it('sign up without last_name', async () => {
        let result = await HTTP({
            url: '/sign-up/form-auth',
            method: 'POST',
            body: qs('last_name', user),
            contentType: 'application/x-www-form-urlencoded'
        });

        assert.strictEqual(result.url, serverAddr + '/sign-up?err=missing%20last%20name');
    });

    it('sign up without password', async () => {
        let result = await HTTP({
            url: '/sign-up/form-auth',
            method: 'POST',
            body: qs('password', user),
            contentType: 'application/x-www-form-urlencoded'
        });

        assert.strictEqual(result.url, serverAddr + '/sign-up?err=missing%20password');
    });

    it('sign up without confirm_password', async () => {
        let result = await HTTP({
            url: '/sign-up/form-auth',
            method: 'POST',
            body: qs('confirm_password', user),
            contentType: 'application/x-www-form-urlencoded'
        });

        assert.strictEqual(result.url, serverAddr + '/sign-up?err=missing%20confirm%20password');
    });

    it('sign up without matching passwords', async () => {
        user.confirm_password = 'hotdog123';

        let result = await HTTP({
            url: '/sign-up/form-auth',
            method: 'POST',
            body: qs('', user),
            contentType: 'application/x-www-form-urlencoded'
        });

        assert.strictEqual(result.url, serverAddr + '/sign-up?err=passwords%20do%20not%20match');
    });
});

describe('User Sign Up Through Google', () => {
    let user = {
        email: 'peter-smith@gmail.com',
        first_name: 'peter',
        last_name: 'smith'
    }

    it('sign up without body', async () => {
        let result = await HTTP({
            url: '/sign-up/google-auth',
            method: 'POST',
            contentType: 'application/json'
        }).then(response => response.json())

        assert.strictEqual(result.message, 'missing body');
    });

    it('sign up without email', async () => {
        let result = await HTTP({
            url: '/sign-up/google-auth',
            method: 'POST',
            body: JSON.stringify({ first_name: 'peter' }),
            contentType: 'application/json'
        }).then(response => response.json())

        assert.strictEqual(result.message, 'missing email');
    });

    it('sign up with existing email', async () => {
        let result = await HTTP({
            url: '/sign-up/google-auth',
            method: 'POST',
            body: JSON.stringify({ email: 'isakwebdev@gmail.com', first_name: 'peter', last_name: 'anderson' }),
            contentType: 'application/json'
        }).then(response => response.json())

        assert.strictEqual(result.message, 'user already exists');
    });



    it('sign up without first name', async () => {
        let result = await HTTP({
            url: '/sign-up/google-auth',
            method: 'POST',
            body: JSON.stringify({ email: user.email }),
            contentType: 'application/json'
        }).then(response => response.json())

        assert.strictEqual(result.message, 'missing first name');
    });

    it('sign up without last name', async () => {
        let result = await HTTP({
            url: '/sign-up/google-auth',
            method: 'POST',
            body: JSON.stringify({ email: user.email, first_name: user.first_name }),
            contentType: 'application/json'
        }).then(response => response.json())

        assert.strictEqual(result.message, 'missing last name');
    });
});