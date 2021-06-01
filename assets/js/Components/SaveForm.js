function variables() {
    return {
        em: document.getElementById('email'),
        fn: document.getElementById('first_name'),
        ln: document.getElementById('last_name'),
        sb: document.querySelector('.btn-primary'),
        f: document.querySelector('.row.g-3'),
        fd: () => {
            if (sessionStorage.getItem('formData') != null)
                // only attempt to parse sessionStorage if it's present else an error will be thrown
                return JSON.parse(sessionStorage.getItem('formData'));

            return null;
        }
    }
}

function saveForm() {
    if (window.location.pathname === '/sign-up') {
        // save form data that isn't sensetive to reduce the annoyment factor
        // it's super annoying especially on mobile when you click submit and you have to re-enter all the data

        const { em, fn, ln, sb, f, fd } = variables();
        let fdp = fd();

        if (fdp != null) {
            // if fdp is not equal to null then the user has submitted the form and encounterd an error
            // re-populate the form with from the previous request
            em.value = fdp.em;
            fn.value = fdp.fn;
            ln.value = fdp.ln;
        }

        sb.addEventListener('click', () => {

            /* 
                if the submit is successful then the server will redirect the user to the /users/account page which will trigger 
                the if statement at the end of the function
            */

            window.sessionStorage.setItem('formData', JSON.stringify({ // write the current form values to sessionStorage
                em: em.value,
                fn: fn.value,
                ln: ln.value
            }));

            f.submit();
        });
    }
}

export default saveForm;