function getHomePage() {
    return {
        page_title: '<h1>Lorem ipsum dolor <span>sit amet!</span></h1>',
        page_subtitle: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero pariatur nesciunt voluptatem.</p>',
        page_img: `
        <div 
            class="image" 
            style="background-image:url('${'https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'}')" 
            data-alt="Photo of a happy woman">
        </div>`
    }
}

export default getHomePage;