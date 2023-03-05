import dataBase from '../../data';
import Filter from '../../templates/filter';

export const BRAND_FILTER_CHECKBOX_NAME = 'filter-brand';

class BrandFilter extends Filter {
    constructor() {
        super();
        this.content = document.createElement('ul') as HTMLUListElement;
        this.content.classList.add('filter__content');
        this.content.classList.add('filter-list');
    }

    createElements(item: string): HTMLLIElement {
        const filterListItem = document.createElement('li') as HTMLLIElement;
        filterListItem.classList.add('filter-list__item');

        const brandCheck = document.createElement('input') as HTMLInputElement;
        brandCheck.classList.add('visually-hidden');
        brandCheck.classList.add('filter-list__input');
        brandCheck.id = `filter-${item}`;
        brandCheck.setAttribute('type', 'checkbox');
        brandCheck.setAttribute('name', `${BRAND_FILTER_CHECKBOX_NAME}`);
        brandCheck.setAttribute('value', `${item}`);

        const brandHeader = document.createElement('label') as HTMLLabelElement;
        brandHeader.classList.add('filter-list__label');
        brandHeader.setAttribute('for', `filter-${item}`);
        brandHeader.textContent = `${item}`;

        filterListItem.append(brandCheck);
        filterListItem.append(brandHeader);

        return filterListItem;
    }

    fillContent(): string[] {
        this.header.textContent = `Бренд`;

        const allbrandArr: string[] = [];

        dataBase.products.forEach((elem) => {
            allbrandArr.push(elem.brand);
        });
        const uniqueArr = [...new Set(allbrandArr)];

        return uniqueArr;
    }
    appendElements(): HTMLDivElement {
        this.wrapper.append(this.header);

        const nameArr = this.fillContent();
        if (this.content) {
            for (let i = 0; i < nameArr.length; i++) {
                const listItem = this.createElements(nameArr[i]);
                const brandLength = 10;
                if (this.content.querySelectorAll('.filter-list__item').length < brandLength) {
                    this.content.append(listItem);
                }
            }
            this.wrapper.append(this.content);
        }
        return this.wrapper;
    }

    render(): void {
        const mainWrapper = document.querySelector('.left-content') as HTMLDivElement;
        const newBlock = this.appendElements();
        mainWrapper.append(newBlock);
    }
}

export default BrandFilter;
