// image-picker

class Select {
    init() {
        let imagePicker = document.querySelector('.image-picker');
        let selectedImg = document.getElementById('selected-img');

        if (imagePicker != null && selectedImg != null) {
            let images = Array.from(imagePicker.querySelectorAll('img'));

            images.forEach(img => {
                img.addEventListener('click', () => selectedImg.src = img.src);
            });
        }
    }
}

export default Select;
