import Products from './Products';

class Controls extends Products {
    constructor() {
        super();
        this.product_collection = new URLSearchParams(window.location.search).get('q');
    }

    addEventListeners() {
        document.querySelectorAll('.clickable').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                let result = await this.refresh(new URLSearchParams(window.location.search).get('q'), btn.getAttribute('data-page'));

                this.cC.innerHTML = this.template(result);
                this.addEventListeners();
            });
        });

        document.querySelector('.select-collection')
            .addEventListener('change', async (e) => {
                this.product_collection = e.target.value;
                let result = await this.refresh(e.target.value, 1);
                this.cC.innerHTML = this.template(result);
                this.addEventListeners();
            });
    }

    template(injection) {
        return `
        <div class="d-flex justify-content-between align-items-center pb-3">
            <div class="select">
                <select class="form-select text-capitalize select-collection">
                    ${injection.collections.map(collection => collection != this.product_collection
            ? `<option value="${collection}">${collection.replace('_', ' ')}</option>`
            : `<option value="${collection}" selected>${collection.replace('_', ' ')}</option>`)}
                </select>
            </div>
            <div class="pagination-top">
                <ul class="pagination">
                    ${injection.result.hasPrevPage ? `<li class="page-item clickable" data-page=${injection.result.prevPage}><a class="page-link">Previous</a></li>` : '<li class="page-item disabled"><a class="page-link">Previous</a></li>'}
                    ${injection.result.hasPrevPage ? `<li class="page-item clickable" data-page=${injection.result.prevPage}><a class="page-link">${injection.result.prevPage}</a></li>` : ''}
                                                      <li class="page-item active"><a class="page-link">${injection.result.page}</a></li>
                    ${injection.result.hasNextPage ? `<li class="page-item clickable" data-page=${injection.result.nextPage}><a class="page-link">${injection.result.nextPage}</a></li>` : ''}
                    ${injection.result.hasNextPage ? `<li class="page-item clickable" data-page=${injection.result.nextPage}><a class="page-link">Next</a></li>` : '<li class="page-item disabled"><a class="page-link">Next</a></li>'}
                </ul>
            </div>
        </div>`;
    }
}

export default Controls;