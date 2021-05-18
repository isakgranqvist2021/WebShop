function toggleClass() {
    // if the scrollbar is at 0px then the navbar will have a isTop class added else it's removed
    const navbar = document.querySelector('nav');

    window.addEventListener('scroll', () =>
        window.scrollY > 0 ? navbar.classList.remove('isTop') : navbar.classList.add('isTop'));
}

export default toggleClass;