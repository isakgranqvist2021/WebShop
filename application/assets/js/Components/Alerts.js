class Alerts {
    constructor() {
        this.alerts = document.getElementById('alerts');
        this.template = document.getElementById('alert-template');
    }

    displayAlert(alert) {
        if ('content' in document.createElement('template')) {
            let t = this.template.content.cloneNode(true);
            let newAlert = t.children[0];

            newAlert.classList.add('alert-' + alert.type);
            newAlert.textContent = alert.message;
            this.alerts.appendChild(newAlert);
            this.addCloseBtn(newAlert);
        }
    }

    addCloseBtn(parent) {
        let closeBtn = document.createElement('i');
        closeBtn.addEventListener('click', (e) => parent.remove());
        closeBtn.classList.add('fas', 'fa-times');
        parent.appendChild(closeBtn);
    }
}

export default Alerts;