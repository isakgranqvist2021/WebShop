const alerts = document.getElementById('alerts');
const template = document.getElementById('alert-template');

function displayAlert(alert) {
    if ('content' in document.createElement('template')) {
        let t = template.content.cloneNode(true);
        let newAlert = t.children[0];

        newAlert.classList.add('alert-' + alert.type);
        newAlert.textContent = alert.message;
        alerts.appendChild(newAlert);
        _addCloseBtn(newAlert);
    }
}

function _addCloseBtn(parent) {
    let closeBtn = document.createElement('i');
    closeBtn.addEventListener('click', (e) => parent.remove());
    closeBtn.classList.add('fas', 'fa-times');
    parent.appendChild(closeBtn);
}

export default displayAlert;