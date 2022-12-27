import Wrapper from '../../templates/wrapper';
import smaller from '../../assets/icons/smaller.svg';
import bigger from '../../assets/icons/bigger.svg';
import BrandFilter from './brand-filter';

function createPanel(side: string, wrapper: HTMLDivElement) {
    if (side === 'left') {
        const resetBtn = document.createElement('button') as HTMLButtonElement;
        resetBtn.classList.add('left-panel__btn');
        resetBtn.classList.add('reset-btn');
        resetBtn.textContent = `Сбросить фильтры`;

        const copyBtn = document.createElement('button') as HTMLButtonElement;
        copyBtn.classList.add('left-panel__btn');
        copyBtn.classList.add('copy-btn');
        copyBtn.textContent = `Копировать ссылку`;

        wrapper.append(resetBtn);
        wrapper.append(copyBtn);
    } else if (side === 'right') {
        const sortingSelect = document.createElement('select') as HTMLSelectElement;
        sortingSelect.classList.add('right-panel__options');
        sortingSelect.classList.add('options-list');

        const priceSorting = document.createElement('option') as HTMLOptionElement;
        priceSorting.classList.add('options-list__item');
        priceSorting.textContent = `По возрастанию в цене`;

        const discountSorting = document.createElement('option') as HTMLOptionElement;
        discountSorting.classList.add('options-list__item');
        discountSorting.textContent = `По возрастанию скидки`;

        sortingSelect.append(priceSorting);
        sortingSelect.append(discountSorting);

        const totalCards = document.createElement('p') as HTMLParagraphElement;
        totalCards.classList.add('right-panel__total-cards');

        const totalCountCards = document.createElement('span') as HTMLSpanElement;
        totalCountCards.classList.add('right-panel__count');
        totalCards.textContent = `Всего найдено: `;
        totalCountCards.textContent = '0';
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

        const smallerView = document.createElement('button') as HTMLButtonElement;
        smallerView.classList.add('view-btn');
        smallerView.classList.add('smaller-btn');
        smallerView.style.backgroundImage = `url('${smaller}')`;

        viewChoiseWrapper.append(biggerView);
        viewChoiseWrapper.append(smallerView);

        biggerView.addEventListener('click', () => {
            const card = document.querySelectorAll('.card') as NodeListOf<HTMLDivElement>;
            const cardList = document.querySelectorAll('.card-list') as NodeListOf<HTMLUListElement>;
            const cardHeader = document.querySelectorAll('.card__header') as NodeListOf<HTMLElement>;
            card.forEach((elem, idx) => {
                elem.style.width = '30em';
                elem.style.height = '30em';
                cardList[idx].style.top = '35%';
                cardList[idx].style.fontSize = '20px';
                cardHeader[idx].style.fontSize = '32px';
            });
        });

        smallerView.addEventListener('click', () => {
            const card = document.querySelectorAll('.card') as NodeListOf<HTMLDivElement>;
            const cardList = document.querySelectorAll('.card-list') as NodeListOf<HTMLUListElement>;
            const cardHeader = document.querySelectorAll('.card__header') as NodeListOf<HTMLElement>;
            card.forEach((elem, idx) => {
                elem.style.width = '13em';
                elem.style.height = '16em';
                cardList[idx].style.top = '20%';
                cardList[idx].style.fontSize = '12px';
                cardHeader[idx].style.fontSize = '18px';
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
        return this.wrapper;
    }
}

export default MainWrapper;
