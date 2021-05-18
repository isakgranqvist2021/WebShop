import displayAlert from './DisplayAlerts';

function clearQuery() {
    const q = new URLSearchParams(window.location.search); // everything after ?= in the address bar
    const e = q.get('err'); // set by the server
    const s = q.get('success'); // set by the server

    // send the message if present to the displayAlert function 
    if (e != null)
        displayAlert({ message: e, type: 'error' });

    if (s != null)
        displayAlert({ message: s, type: 'success' });


    // update the address bar so the query parameters isn't visible to the user
    window.history.pushState({}, document.title, window.location.pathname);
}

export default clearQuery;