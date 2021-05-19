function homePage() {
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

function siteLogo() {
    return `
    <svg viewBox="0 0 149 163" xmlns="http://www.w3.org/2000/svg">
        <path d="M22.4677 162.152C33.8426 162.152 42.9734 162.152 54.2786 162.152C103.608 162.152 78.3857 92.6858 108.535 77.7144C108.535 93.1869 108.535 162.152 108.535 162.152H119.739C119.739 162.152 119.467 126.044 129.934 91.2897C138.878 61.5949 148.451 55.3602 148.451 42.4788C148.451 8.05244 104.461 0 104.461 0C104.461 0 88.3466 48.3568 77.8749 75.2675C62.2727 115.366 53.0771 124.667 44.5219 124.667C40.2444 124.667 35.7074 122.63 35.7074 122.63C35.7074 122.63 0 127.511 0 144.926C0.00162152 156.227 11.0928 162.152 22.4677 162.152Z"/>
    </svg>`
}

function websiteConfig(url) {
    switch (url) {
        case '/': return { logo: siteLogo(), ...homePage() }
        default: return { logo: siteLogo() }
    }
}

export default websiteConfig