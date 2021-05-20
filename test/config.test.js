import chai from 'chai';

/* functions to be tested */

import getCollections from '../config/page/collections';
import getGeneralConfig from '../config/page/general-config';
import getHomePage from '../config/page/home-page';
import getSiteLogo from '../config/page/site-logo';
import getStylesheets from '../config/page/stylesheets';
import serverConfig from '../config/config';

const expect = chai.expect;
const assert = chai.assert;

describe('Server Configuration', () => {
    it('should have to correct properties & correct types', () => {
        let data = serverConfig;
        expect(data).to.have.property('PORT');
        expect(data).to.have.property('DB_URI');
        assert.typeOf(data.PORT, 'number');
        assert.typeOf(data.DB_URI, 'string');
    })
});

describe('Site Configuration', () => {

    it('return all collections & have correct data types', () => {
        let data = getCollections();
        expect(data).to.have.property('collections');
        data.collections.forEach(collection => {
            expect(collection).to.have.property('label');
            expect(collection).to.have.property('thumbnail');
            expect(collection.thumbnail).to.have.property('src');
            expect(collection.thumbnail).to.have.property('alt');
            assert.typeOf(collection.label, 'string');
            assert.typeOf(collection.thumbnail, 'object');
            assert.typeOf(collection.thumbnail.src, 'string');
            assert.typeOf(collection.thumbnail.alt, 'string');
        });
    });

    it('return the general config for the site & have correct data types', () => {
        let data = getGeneralConfig();
        expect(data).to.have.property('site_title');
        assert.typeOf(data.site_title, 'string');
    });

    it('should return the correct data & have the correct types', () => {
        let data = getHomePage();
        expect(data).to.have.property('page_title');
        expect(data).to.have.property('page_subtitle');
        expect(data).to.have.property('page_img');
        assert.typeOf(data.page_title, 'string');
        assert.typeOf(data.page_subtitle, 'string');
        assert.typeOf(data.page_img, 'string');
    });

    it('should return the site logo', () => {
        let data = getSiteLogo();
        expect(data).to.have.property('logo');
        assert.typeOf(data.logo, 'string');
    });

    it('should return an empty array or an array of stylesheets', () => {
        let data = getStylesheets();
        expect(data).to.have.property('stylesheets');
        assert.typeOf(data, 'object');
    });
});