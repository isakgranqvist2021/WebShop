function vantaSetup() {
    let cc = document.querySelector('.content.container'); // content that is inside the header section
    let hc = document.querySelector('.hero-section'); // the hero section container

    if (hc != null) { // only execute the vanta.globe method if the hero section is present 
        VANTA.GLOBE({
            el: '.hero-section',
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0xffffff,
            backgroundColor: 0x212529
        });
    }

    // the purpose of this part is to prevent the content to be visible before the background has finished loading
    if (cc != null) // to prevent this part from being executed on the wrong page
        return cc.classList.add('show'); // add show class to make it visible
}

export default vantaSetup;