abstract class Filter {
    protected wrapper: HTMLDivElement;
    protected header: HTMLElement;
    protected content?: HTMLUListElement;

    constructor() {
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('left-content__filter-wrapper');
        this.wrapper.classList.add('filter');
        this.header = document.createElement('h3');
        this.header.classList.add('filter__header');
    }

    createElements() {
        return this.content;
    }

    fillContent() {
        return;
    }

    appendElements() {
        return this.wrapper;
    }

    render() {
        return this.appendElements();
    }
}

export default Filter;
