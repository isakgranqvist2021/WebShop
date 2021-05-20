import assert from 'assert';
import tools from './tools';

describe('User Sign Up Through Google', () => {
    let user = {
        email: 'peter-smith@gmail.com',
        first_name: 'peter',
        last_name: 'smith'
    }

    it('sign up without body', async () => {
        let result = await tools.HTTP({
            url: '/sign-up/google-auth',
            method: 'POST',
            contentType: 'application/json'
        }).then(response => response.json())

        assert.strictEqual(result.message, 'missing body');
    });

    it('sign up without email', async () => {
        let result = await tools.HTTP({
            url: '/sign-up/google-auth',
            method: 'POST',
            body: JSON.stringify({
                first_name: 'peter'
            }),
            contentType: 'application/json'
        }).then(response => response.json())

        assert.strictEqual(result.message, 'missing email');
    });

    it('sign up with existing email', async () => {
        let result = await tools.HTTP({
            url: '/sign-up/google-auth',
            method: 'POST',
            body: JSON.stringify({
                email: 'isakwebdev@gmail.com', // is alredy in the database
                first_name: 'peter',
                last_name: 'anderson'
            }),
            contentType: 'application/json'
        }).then(response => response.json())

        assert.strictEqual(result.message, 'user already exists');
    });

    it('sign up without first_name', async () => {
        let result = await tools.HTTP({
            url: '/sign-up/google-auth',
            method: 'POST',
            body: JSON.stringify({
                email: user.email,
                last_name: 'anderson'
            }),
            contentType: 'application/json'
        }).then(response => response.json())

        assert.strictEqual(result.message, 'missing first name');
    });

    it('sign up with to long first_name', async () => {
        let result = await tools.HTTP({
            url: '/sign-up/google-auth',
            method: 'POST',
            body: JSON.stringify({
                email: user.email,
                first_name: 'qjwtjqwotqiwjtqiowjtqiwjtoqiwjtqiwojtqijwtqwtqwtqwtqwt',
                last_name: 'anderson'
            }),
            contentType: 'application/json'
        }).then(response => response.json())

        assert.strictEqual(result.message, 'first name has to be between 2 and 50 characters');
    });

    it('sign up with to short first_name', async () => {
        let result = await tools.HTTP({
            url: '/sign-up/google-auth',
            method: 'POST',
            body: JSON.stringify({
                email: user.email,
                first_name: 'h',
                last_name: 'anderson'
            }),
            contentType: 'application/json'
        }).then(response => response.json())

        assert.strictEqual(result.message, 'first name has to be between 2 and 50 characters');
    });

    it('sign up without last_name', async () => {
        let result = await tools.HTTP({
            url: '/sign-up/google-auth',
            method: 'POST',
            body: JSON.stringify({
                email: user.email,
                first_name: user.first_name
            }),
            contentType: 'application/json'
        }).then(response => response.json())

        assert.strictEqual(result.message, 'missing last name');
    });

    it('sign up to long last_name', async () => {
        let result = await tools.HTTP({
            url: '/sign-up/google-auth',
            method: 'POST',
            body: JSON.stringify({
                email: user.email,
                first_name: user.first_name,
                last_name: 'oqjwtqjiwtoqwhtqoiwhtqiwhtqoiwhtoqiwthoqwtqwtqwtqwtqwtx'
            }),
            contentType: 'application/json'
        }).then(response => response.json())

        assert.strictEqual(result.message, 'last name has to be between 2 and 50 characters');
    });

    it('sign up to short last_name', async () => {
        let result = await tools.HTTP({
            url: '/sign-up/google-auth',
            method: 'POST',
            body: JSON.stringify({
                email: user.email,
                first_name: user.first_name,
                last_name: 'c'
            }),
            contentType: 'application/json'
        }).then(response => response.json())

        assert.strictEqual(result.message, 'last name has to be between 2 and 50 characters');
    });
});