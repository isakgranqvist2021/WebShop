window.googleAuthInit = function () {
    const googleBtn = document.getElementById('google-btn');

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
    console.log(profile.getGivenName());

    fetch(`http://localhost:3000/${window.location.pathname.replace('/', '')}/google-auth`, {
        method: 'POST',
        body: JSON.stringify({
            email: profile.getEmail(),
            first_name: profile.getGivenName(),
            last_name: profile.getFamilyName(),
            photo: profile.getImageUrl(),
            google_id: profile.getId()
        }),
        headers: { 'Content-Type': 'application/json' }

    }).then(response => response.json())
        .then(response => {
            console.log(response);

            response.success ? window.location.pathname = response.data.redirect : onError(response.message)
        })
        .catch(err => onError(err));
}

function onError(err) {
    console.log(err);

    alert(err);
}
