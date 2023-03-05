import Wrapper from '../../templates/wrapper';
import smaller from '../../assets/icons/smaller.svg';
import bigger from '../../assets/icons/bigger.svg';
import BrandFilter from './brand-filter';
import checkingView from './box-inherit/view-checking';
import Card from './card';
import dataBase from '../../data';
import cardsCounter from './cards-counter';

export let isBig = false;

function createPanel(side: string, wrapper: HTMLDivElement) {
    if (side === 'left') {
        const resetBtn = document.createElement('button') as HTMLButtonElement;
        resetBtn.classList.add('left-panel__btn');
        resetBtn.classList.add('reset-btn');
        resetBtn.textContent = `Сбросить фильтры`;

        resetBtn.addEventListener('click', () => {
            const data = dataBase.products;

            const container = document.querySelector('.right-content') as HTMLDivElement;
            container.innerHTML = '';

            const cardItem = new Card();
            for (let i = 0; i < data.length; i++) {
                cardItem.render(i);
            }
            cardsCounter();

            const checkboxFilters = document.querySelectorAll('.filter-list__input') as NodeListOf<HTMLInputElement>;
            checkboxFilters.forEach((filter) => {
                filter.checked = false;
            });
        });

        const copyBtn = document.createElement('button') as HTMLButtonElement;
        copyBtn.classList.add('left-panel__btn');
        copyBtn.classList.add('copy-btn');
        copyBtn.textContent = `Копировать ссылку`;

        copyBtn.addEventListener('click', () => {
            const link = document.location.href;
            navigator.clipboard.writeText(`${link}`);
            copyBtn.textContent = `Ссылка cкопирована`;
            setTimeout(() => {
                copyBtn.textContent = `Копировать ссылку`;
            }, 1500);
        });

        wrapper.append(resetBtn);
        wrapper.append(copyBtn);
    } else if (side === 'right') {
        const sortingSelect = document.createElement('select') as HTMLSelectElement;
        sortingSelect.classList.add('right-panel__options');
        sortingSelect.classList.add('options-list');

        const defaultOption = document.createElement('option') as HTMLOptionElement;
        defaultOption.classList.add('options-list__item');
        defaultOption.setAttribute('disabled', 'true');
        defaultOption.setAttribute('selected', 'true');
        defaultOption.textContent = `Сортировать`;

        const priceSortingMax = document.createElement('option') as HTMLOptionElement;
        priceSortingMax.classList.add('options-list__item');
        priceSortingMax.textContent = `Цена по возрастанию`;

        const discountSortingMax = document.createElement('option') as HTMLOptionElement;
        discountSortingMax.classList.add('options-list__item');
        discountSortingMax.textContent = `Скидка по возрастанию`;

        const priceSortingMin = document.createElement('option') as HTMLOptionElement;
        priceSortingMin.classList.add('options-list__item');
        priceSortingMin.textContent = `Цена по убыванию`;

        const discountSortingMin = document.createElement('option') as HTMLOptionElement;
        discountSortingMin.classList.add('options-list__item');
        discountSortingMin.textContent = `Скидка по убыванию`;

        sortingSelect.append(defaultOption);
        sortingSelect.append(priceSortingMax);
        sortingSelect.append(priceSortingMin);
        sortingSelect.append(discountSortingMax);
        sortingSelect.append(discountSortingMin);

        const totalCards = document.createElement('p') as HTMLParagraphElement;
        totalCards.classList.add('right-panel__total-cards');

        const totalCountCards = document.createElement('span') as HTMLSpanElement;
        totalCountCards.classList.add('right-panel__count');
        totalCards.textContent = `Всего найдено: `;
        totalCards.append(totalCountCards);

        const searchInput = document.createElement('input') as HTMLInputElement;
        searchInput.classList.add('right-panel__search');
        searchInput.setAttribute('placeholder', 'Найти продукт');

        const viewChoiseWrapper = document.createElement('div') as HTMLDivElement;
        viewChoiseWrapper.classList.add('right-panel__view-btn-wrapper');

        const biggerView = document.createElement('button') as HTMLButtonElement;
        biggerView.classList.add('view-btn');
        biggerView.classList.add('bigger-btn');
        biggerView.style.backgroundImage = `url('${bigger}')`;
        biggerView.id = 'big-btn';

        const smallerView = document.createElement('button') as HTMLButtonElement;
        smallerView.classList.add('view-btn');
        smallerView.classList.add('smaller-btn');
        smallerView.style.backgroundImage = `url('${smaller}')`;

        viewChoiseWrapper.append(biggerView);
        viewChoiseWrapper.append(smallerView);

        biggerView.addEventListener('click', () => {
            isBig = true;
            const card = document.querySelectorAll('.card') as NodeListOf<HTMLDivElement>;
            const cardList = document.querySelectorAll('.card-list') as NodeListOf<HTMLUListElement>;
            const cardHeader = document.querySelectorAll('.card__header') as NodeListOf<HTMLElement>;
            card.forEach((elem, idx) => {
                elem.classList.add('card_bigger');
                cardList[idx].classList.add('card-list_bigger');
                cardHeader[idx].classList.add('card__header_bigger');
            });
        });

        smallerView.addEventListener('click', () => {
            isBig = false;
            const card = document.querySelectorAll('.card') as NodeListOf<HTMLDivElement>;
            const cardList = document.querySelectorAll('.card-list') as NodeListOf<HTMLUListElement>;
            const cardHeader = document.querySelectorAll('.card__header') as NodeListOf<HTMLElement>;
            card.forEach((elem, idx) => {
                elem.classList.remove('card_bigger');
                cardList[idx].classList.remove('card-list_bigger');
                cardHeader[idx].classList.remove('card__header_bigger');
            });
        });

        wrapper.append(sortingSelect);
        wrapper.append(totalCards);
        wrapper.append(searchInput);
        wrapper.append(viewChoiseWrapper);
    }
}

class MainWrapper extends Wrapper {
    protected panel: HTMLDivElement;
    protected content: HTMLDivElement;
    protected brand: BrandFilter;

    constructor() {
        super();
        this.panel = document.createElement('div') as HTMLDivElement;
        this.content = document.createElement('div') as HTMLDivElement;
        this.brand = new BrandFilter();
    }
    addClasses(side: string) {
        this.wrapper.classList.add(`container-${side}`);
        this.panel.classList.add(`container-${side}__panel`);
        this.panel.classList.add(`${side}-panel`);
        this.content.classList.add(`container-${side}__content`);
        this.content.classList.add(`${side}-content`);
    }

    createInnerPanel(side: string, wrapper: HTMLDivElement): void {
        createPanel(side, wrapper);
    }

    createElement(elem: HTMLElement): HTMLElement {
        return elem;
    }

    createWrapper(side: string) {
        this.createInnerPanel(side, this.panel);
        return this.wrapper.append(this.panel), this.wrapper.append(this.content);
    }

    render(side: string) {
        this.addClasses(side);
        this.createWrapper(side);
        setTimeout(() => {
            checkingView(isBig);
        }, 1);
        return this.wrapper;
    }
}

export default MainWrapper;
