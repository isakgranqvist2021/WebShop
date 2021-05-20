import assert from 'assert';
import fetch from 'node-fetch';

// email=${data.email}&full_name=${data.full_name}&password=${data.password}&confirm_password=${data.password}


function qs(exclude, obj) {
    let str = Object.keys(obj).map(k => {
        if (exclude != k)
            return `${k}=${obj[k]}`;
    }).filter(val => val != undefined);


    return str.join('&')
}

async function HTTP(config) {
    return fetch(`http://localhost:3000${config.url}`, {
        method: config.method,
        body: config.body,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

describe('User Sign Up', () => {
    let user = {
        email: 'peter-smith@gmail.com',
        first_name: 'peter',
        last_name: 'smith',
        password: 'pasword12345',
        confirm_password: 'password12345'
    }

    it('sign up without email - gives error', async () => {
        let result = await HTTP({
            url: '/sign-up/form-auth',
            method: 'POST',
            body: qs('email', user)
        });

        assert.strictEqual(result.url, 'http://localhost:3000/sign-up?err=missing%20email');
    });

    it('sign up without first_name - gives error', async () => {
        let result = await HTTP({
            url: '/sign-up/form-auth',
            method: 'POST',
            body: qs('first_name', user)
        });

        assert.strictEqual(result.url, 'http://localhost:3000/sign-up?err=missing%20first%20name');
    });

    it('sign up without last_name - gives error', async () => {
        let result = await HTTP({
            url: '/sign-up/form-auth',
            method: 'POST',
            body: qs('last_name', user)
        });

        assert.strictEqual(result.url, 'http://localhost:3000/sign-up?err=missing%20last%20name');
    });

    it('sign up without password - gives error', async () => {
        let result = await HTTP({
            url: '/sign-up/form-auth',
            method: 'POST',
            body: qs('password', user)
        });

        assert.strictEqual(result.url, 'http://localhost:3000/sign-up?err=missing%20password');
    });

    it('sign up without confirm_password - gives error', async () => {
        let result = await HTTP({
            url: '/sign-up/form-auth',
            method: 'POST',
            body: qs('confirm_password', user)
        });

        assert.strictEqual(result.url, 'http://localhost:3000/sign-up?err=missing%20confirm%20password');
    });

    it('sign up without matching passwords - gives error', async () => {
        user.confirm_password = 'hotdog123';

        let result = await HTTP({
            url: '/sign-up/form-auth',
            method: 'POST',
            body: qs('', user)
        });

        assert.strictEqual(result.url, 'http://localhost:3000/sign-up?err=passwords%20do%20not%20match');
    });
});