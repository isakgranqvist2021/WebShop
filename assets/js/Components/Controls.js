import Products from './Products';

class Controls extends Products {
    constructor() {
        super();
    }

    navigate() {
        console.log('hello, world');
    }

    addEventListeners() {
        document.querySelectorAll('.clickable').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                let result = await this.refresh('all', btn.getAttribute('data-page'));
                this.cC.innerHTML = this.template(result);
                this.addEventListeners();
            });
        });
    }

    template(injection) {
        return `    
        <div class="pagination-top">
            <ul class="pagination">
                ${injection.hasPrevPage ? `<li class="page-item clickable" data-page=${injection.prevPage}><a class="page-link">Previous</a></li>` : '<li class="page-item disabled"><a class="page-link">Previous</a></li>'}
                ${injection.hasPrevPage ? `<li class="page-item clickable" data-page=${injection.prevPage}><a class="page-link">${injection.prevPage}</a></li>` : ''}
                                                <li class="page-item active"><a class="page-link">${injection.page}</a></li>
                ${injection.hasNextPage ? `<li class="page-item clickable" data-page=${injection.nextPage}><a class="page-link">${injection.nextPage}</a></li>` : ''}
                ${injection.hasNextPage ? `<li class="page-item clickable" data-page=${injection.nextPage}><a class="page-link">Next</a></li>` : '<li class="page-item disabled"><a class="page-link">Next</a></li>'}
            </ul>
        </div>`;
    }
}

export default Controls;