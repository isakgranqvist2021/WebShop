window.googleAuthInit = function () {
    const googleBtn = document.getElementById('gSignInWrapper');

    if (googleBtn != null) {
        const parameters = [
            googleBtn,
            new Object(),
            onSuccess,
            (err) => onError(err.error),
        ];

        gapi.load('auth2', function () {
            gapi.auth2.init({
                client_id: '558690978835-57rb86ssg02rmj71shc6mhu0gsrnfc2d.apps.googleusercontent.com', // public id for grabbing stuff from google
                cookiepolicy: 'single_host_origin',
            }).attachClickHandler(...parameters); // add eventListener to the google btn
        });
    }
}


function onSuccess(google) {
    const profile = google.getBasicProfile(); // => get the basic profile information

    fetch(`http://localhost:3000/${window.location.pathname.replace('/', '')}/google-auth`, {
        method: 'POST',
        body: JSON.stringify({
            email: profile.Qt,
            first_name: profile.eU,
            last_name: profile.$R,
            photo: profile.iJ,
            google_id: profile.tS
        }),
        headers: { 'Content-Type': 'application/json' }

    }).then(response => response.json())
        .then(response => response.success ? window.location.pathname = '/sign-in' : onError(response.message))
        .catch(err => onError(err));
}

function onError(err) {
    alert(err);
}
