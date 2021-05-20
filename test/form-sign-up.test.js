import assert from 'assert';
import tools from './tools';

const serverAddr = tools.serverAddr;

describe('User Sign Up Through Form', () => {
    let user = {
        email: 'peter-smith@gmail.com',
        first_name: 'peter',
        last_name: 'smith',
        password: 'password12345',
        confirm_password: 'password12345'
    }

    it('sign up without body', async () => {
        let result = await tools.HTTP({
            url: '/sign-up/form-auth',
            method: 'POST',
            contentType: 'application/x-www-form-urlencoded'
        });

        assert.strictEqual(result.url, serverAddr + '/sign-up?err=missing%20body');
    });

    it('sign up without auth type', async () => {
        let result = await tools.HTTP({
            url: '/sign-up',
            method: 'POST',
            body: tools.qs(user),
            contentType: 'application/x-www-form-urlencoded'
        });
        assert.strictEqual(result.statusText, 'Not Found');
    });

    it('sign up with wrong authtype', async () => {
        let result = await tools.HTTP({
            url: '/sign-up/wrongauth',
            method: 'POST',
            body: tools.qs(user),
            contentType: 'application/x-www-form-urlencoded'
        });

        assert.strictEqual(result.url, serverAddr + '/sign-up?err=auth%20type%20does%20not%20exist');
    });

    it('sign up with wrong authtype only numbers', async () => {
        let result = await tools.HTTP({
            url: '/sign-up/12345',
            method: 'POST',
            body: tools.qs(user),
            contentType: 'application/x-www-form-urlencoded'
        });

        assert.strictEqual(result.url, serverAddr + '/sign-up?err=auth%20type%20does%20not%20exist');
    });

    it('sign up with wrong authtype not supported symbols', async () => {
        let result = await tools.HTTP({
            url: '/sign-up/_qw+-/2tqwt2',
            method: 'POST',
            body: tools.qs(user),
            contentType: 'application/x-www-form-urlencoded'
        });

        assert.strictEqual(result.statusText, 'Not Found');
    });

    it('sign up without email', async () => {
        let result = await tools.HTTP({
            url: '/sign-up/form-auth',
            method: 'POST',
            body: tools.qs({
                first_name: 'peter',
                last_name: 'smith',
                password: 'password12345',
                confirm_password: 'password12345'
            }),
            contentType: 'application/x-www-form-urlencoded'
        });

        assert.strictEqual(result.url, serverAddr + '/sign-up?err=missing%20email');
    });

    it('sign up with bad email', async () => {
        let result = await tools.HTTP({
            url: '/sign-up/form-auth',
            method: 'POST',
            body: tools.qs({
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
        let result = await tools.HTTP({
            url: '/sign-up/form-auth',
            method: 'POST',
            body: tools.qs({
                email: 'peter-smith@gmail.com',
                last_name: 'smith',
                password: 'password12345',
                confirm_password: 'password12345'
            }),
            contentType: 'application/x-www-form-urlencoded'
        });

        assert.strictEqual(result.url, serverAddr + '/sign-up?err=missing%20first%20name');
    });

    it('sign up with too short first_name', async () => {
        let result = await tools.HTTP({
            url: '/sign-up/form-auth',
            method: 'POST',
            body: tools.qs({
                email: 'peter-smith@gmail.com',
                first_name: 'a',
                last_name: 'smith',
                password: 'password12345',
                confirm_password: 'password12345'
            }),
            contentType: 'application/x-www-form-urlencoded'
        });

        assert.strictEqual(result.url, serverAddr + '/sign-up?err=first%20name%20has%20to%20be%20between%202%20and%2050%20characters');
    });

    it('sign up with too long first_name', async () => {
        let result = await tools.HTTP({
            url: '/sign-up/form-auth',
            method: 'POST',
            body: tools.qs({
                email: 'peter-smith@gmail.com',
                first_name: 'aqwtqwtqwtqwtqwtqwtqwtqwtqwtqwtqwqwtqxacasfqwfqwtrqwtqwtqwtq',
                last_name: 'smith',
                password: 'password12345',
                confirm_password: 'password12345'
            }),
            contentType: 'application/x-www-form-urlencoded'
        });

        assert.strictEqual(result.url, serverAddr + '/sign-up?err=first%20name%20has%20to%20be%20between%202%20and%2050%20characters');
    });

    it('sign up without last_name', async () => {
        let result = await tools.HTTP({
            url: '/sign-up/form-auth',
            method: 'POST',
            body: tools.qs({
                email: 'peter-smith@gmail.com',
                first_name: 'peter',
                password: 'password12345',
                confirm_password: 'password12345'
            }),
            contentType: 'application/x-www-form-urlencoded'
        });

        assert.strictEqual(result.url, serverAddr + '/sign-up?err=missing%20last%20name');
    });

    it('sign up with too short last_name', async () => {
        let result = await tools.HTTP({
            url: '/sign-up/form-auth',
            method: 'POST',
            body: tools.qs({
                email: 'peter-smith@gmail.com',
                first_name: 'peter',
                last_name: 'a',
                password: 'password12345',
                confirm_password: 'password12345'
            }),
            contentType: 'application/x-www-form-urlencoded'
        });

        assert.strictEqual(result.url, serverAddr + '/sign-up?err=last%20name%20has%20to%20be%20between%202%20and%2050%20characters');
    });

    it('sign up with to long last_name', async () => {
        let result = await tools.HTTP({
            url: '/sign-up/form-auth',
            method: 'POST',
            body: tools.qs({
                email: 'peter-smith@gmail.com',
                first_name: 'peter',
                last_name: 'wqtqwtqwtjkqwtoqwjtqoiwthqowhtoqhwtoqqwtqwtqqwtqwtsqwtr',
                password: 'password12345',
                confirm_password: 'password12345'
            }),
            contentType: 'application/x-www-form-urlencoded'
        });

        assert.strictEqual(result.url, serverAddr + '/sign-up?err=last%20name%20has%20to%20be%20between%202%20and%2050%20characters');
    });

    it('sign up without password', async () => {
        let result = await tools.HTTP({
            url: '/sign-up/form-auth',
            method: 'POST',
            body: tools.qs({
                email: 'peter-smith@gmail.com',
                first_name: 'peter',
                last_name: 'smith',
                confirm_password: 'password12345'
            }),
            contentType: 'application/x-www-form-urlencoded'
        });

        assert.strictEqual(result.url, serverAddr + '/sign-up?err=missing%20password');
    });

    it('sign up without confirm_password', async () => {
        let result = await tools.HTTP({
            url: '/sign-up/form-auth',
            method: 'POST',
            body: tools.qs({
                email: 'peter-smith@gmail.com',
                first_name: 'peter',
                last_name: 'smith',
                password: 'password12345',
            }),
            contentType: 'application/x-www-form-urlencoded'
        });

        assert.strictEqual(result.url, serverAddr + '/sign-up?err=missing%20confirm%20password');
    });

    it('sign up without matching passwords', async () => {

        let result = await tools.HTTP({
            url: '/sign-up/form-auth',
            method: 'POST',
            body: tools.qs({
                email: 'peter-smith@gmail.com',
                first_name: 'peter',
                last_name: 'smith',
                password: 'password12345',
                confirm_password: 'password1234567'
            }),
            contentType: 'application/x-www-form-urlencoded'
        });

        assert.strictEqual(result.url, serverAddr + '/sign-up?err=passwords%20do%20not%20match');
    });
});

