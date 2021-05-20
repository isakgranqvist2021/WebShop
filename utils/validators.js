function emailValidator(email) {
    if (email.length > 50)
        return false;

    return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}

function isOfLength(min, max, val) {
    return val.length > min && val.length < max;
}

export default { emailValidator, isOfLength };