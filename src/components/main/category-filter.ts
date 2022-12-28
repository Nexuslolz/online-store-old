import dataBase from '../../data';
import Filter from '../../templates/filter';

class CategoryFilter extends Filter {
    constructor() {
        super();
        this.content = document.createElement('ul') as HTMLUListElement;
        this.content.classList.add('filter__content');
        this.content.classList.add('filter-list');
    }

    createElements(item: string): HTMLLIElement {
        const filterListItem = document.createElement('li') as HTMLLIElement;
        filterListItem.classList.add('filter-list__item');

        const categoryCheck = document.createElement('input') as HTMLInputElement;
        categoryCheck.classList.add('visually-hidden');
        categoryCheck.classList.add('filter-list__input');
        categoryCheck.id = `filter-${item}`;
        categoryCheck.setAttribute('type', 'checkbox');
        categoryCheck.setAttribute('name', 'filter');
        categoryCheck.setAttribute('value', `${item}`);

        const categoryHeader = document.createElement('label') as HTMLLabelElement;
        categoryHeader.classList.add('filter-list__label');
        categoryHeader.setAttribute('for', `filter-${item}`);
        categoryHeader.textContent = `${item}`;

        filterListItem.append(categoryCheck);
        filterListItem.append(categoryHeader);

        return filterListItem;
    }

    fillContent(): string[] {
        this.header.textContent = `Категория`;
        this.wrapper.append(this.header);

        const allCategoryArr: string[] = [];

        dataBase.products.forEach((elem) => {
            allCategoryArr.push(elem.category);
        });
        const uniqueArr = [...new Set(allCategoryArr)];

        return uniqueArr;
    }
    appendElements(): HTMLDivElement {
        const nameArr = this.fillContent();

        if (this.content) {
            for (let i = 0; i < nameArr.length; i++) {
                const listItem = this.createElements(nameArr[i]);
                const categoryLength = 5;
                if (this.content.querySelectorAll('.filter-list__item').length < categoryLength) {
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

export default CategoryFilter;
