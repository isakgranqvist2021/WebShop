import Alerts from './Alerts';

class Clear {
    constructor() {
        this.da = new Alerts();
    }

    init() {
        const url = new URL(window.location); // everything after ?= in the address bar

        if (url.searchParams.get('err') != null) {
            this.da.displayAlert({ type: 'danger', message: url.searchParams.get('err') });
        }

        if (url.searchParams.get('success') != null) {
            this.da.displayAlert({ type: 'success', message: url.searchParams.get('success') });
        }

        url.searchParams.delete('err');
        url.searchParams.delete('success');
        window.history.pushState({}, '', url);
        // update the address bar so the query parameters isn't visible to the user
    }
}

export default Clear;