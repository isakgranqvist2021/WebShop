class Slider {
    init() {
        if (document.querySelector('.splide') != null) {
            new Splide('.splide', {
                type: 'loop',
                perPage: 3,
                perMove: 1,
                pagination: false,
                drag: true,
                breakpoints: {
                    992: {
                        perPage: 2
                    },
                    600: {
                        perPage: 1,
                    }
                }
            }).mount();
        }
    }
}

export default Slider;