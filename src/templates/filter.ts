/* eslint-disable @typescript-eslint/no-unused-vars */
abstract class Filter {
    protected wrapper: HTMLDivElement;
    protected header: HTMLElement;
    protected content?: HTMLUListElement;

    constructor() {
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('left-content__filter-wrapper');
        this.wrapper.classList.add('filter');
        this.header = document.createElement('h2');
        this.header.classList.add('filter__header');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    createElements(item?: string, direction?: string): HTMLLIElement | HTMLDivElement {
        const filterListItem = document.createElement('li') as HTMLLIElement;
        return filterListItem;
    }

    createMoreElements?(value: string, min: number, max: number, direction: string): HTMLDivElement {
        const valueWrapper = document.createElement('div');
        return valueWrapper;
    }

    fillContent?(): string[] {
        const allCategoryArr: string[] = [];
        return allCategoryArr;
    }

    appendElements(item?: string, direction?: string, val?: string, min?: number, max?: number): HTMLDivElement {
        return this.wrapper;
    }

    render(): void {
        return;
    }
}

export default Filter;
