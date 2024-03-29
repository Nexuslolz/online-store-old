// import { Link } from './loader/loader-window';
import Data from '../../types/data-types';
import dataBase from '../../data';
import elemLoader from './loader/loader-element';
// import winLoader from './loader/loader-window';
// import imgLoader from './loader/loader-img';
import setFullPrice from './box-inherit/price-maker';
import Buy from '../modal-win/buy-window';
import goToDesc from '../../pages/description/go-to';

interface IDataWrapper {
    products: Data;
}

const addToBox: string[] = [];

class Card {
    dataBase: IDataWrapper;
    constructor() {
        this.dataBase = dataBase;
    }

    createWrapper(id: number): HTMLDivElement {
        const wrapper = document.createElement('div') as HTMLDivElement;
        // const addBtn = document.querySelectorAll('.add-btn');
        wrapper.classList.add('left-content__card');
        wrapper.classList.add('card');
        wrapper.id = String(id);
        // wrapper.style.visibility = 'hidden';
        // setTimeout(elemLoader, 3000);
        elemLoader();

        return wrapper;
    }

    createHeader(): HTMLElement {
        const header = document.createElement('h3') as HTMLElement;
        header.classList.add('card__header');
        return header;
    }

    createInfoBlock(): HTMLUListElement {
        const infoBlock = document.createElement('ul') as HTMLUListElement;
        infoBlock.classList.add('card__wrapper');
        infoBlock.classList.add('card-list');
        return infoBlock;
    }

    createPanel(): HTMLDivElement {
        const panel = document.createElement('div') as HTMLDivElement;
        panel.classList.add('card-panel');

        const addBtn = document.createElement('button') as HTMLButtonElement;
        addBtn.classList.add('card-panel__btn');
        addBtn.classList.add('add-btn');
        // index++;
        // addBtn.id = `${index}`;
        addBtn.textContent = 'добавить';
        const infoBtn = document.createElement('button') as HTMLButtonElement;
        infoBtn.classList.add('card-panel__btn');
        infoBtn.classList.add('info-btn');
        infoBtn.textContent = 'Купить';

        infoBtn.addEventListener('click', () => {
            const modalWindow = new Buy();
            modalWindow.render();
        });

        addBtn.addEventListener('click', (event) => {
            addBtn.classList.toggle('add-btn_active');
            const amount = document.querySelector('.box__amount') as HTMLDivElement;
            const wrapper = document.querySelectorAll('.card') as NodeListOf<HTMLDivElement>;

            let evt: Element | null | undefined;
            if (event.target !== null && event.target instanceof HTMLElement) {
                evt = event.target.closest('.card');
            }
            // && wrapper instanceof HTMLDivElement
            if (amount !== null && wrapper !== null && evt !== null && evt !== undefined) {
                if (addBtn.classList.contains('add-btn_active')) {
                    // localStorage.setItem(`${addBtn.id}_card-class`, `add-btn_active`);
                    amount.textContent = `${Number(amount.textContent) + 1}`;
                    addBtn.textContent = 'удалить';
                    evt.classList.add('card_active');
                    addToBox.push(evt.id);
                } else {
                    // localStorage.removeItem(`${addBtn.id}_card-class`);
                    amount.textContent = `${Number(amount.textContent) - 1}`;
                    addBtn.textContent = 'добавить';
                    evt.classList.remove('card_active');
                    addToBox.pop();
                }
            }
        });

        panel.append(addBtn);
        panel.append(infoBtn);

        return panel;
    }

    // async getData(): Promise<HTMLDivElement | undefined> {
    //     winLoader.open();
    //     const data = await loader(Link.loadLink);
    //     if (data) {
    //         winLoader.close();
    //         return this.fillData(data);
    //     }
    // }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    fillData(dataBase: IDataWrapper, i: number): HTMLDivElement {
        const wrapper = this.createWrapper(i);
        const header = this.createHeader();
        const infoBlock = this.createInfoBlock();
        const panel = this.createPanel();
        header.textContent = `${dataBase.products[i].title}`;

        const infoLength = 2;
        const lastItemInfo = 8;
        const dataKeys: string[] = Object.keys(dataBase.products[i]);
        let listItem;

        for (let j = lastItemInfo; j > infoLength; j--) {
            listItem = document.createElement('li') as HTMLLIElement;
            listItem.classList.add('card-list__item');
            listItem.textContent = `${dataKeys[j]}: ${dataBase.products[i][dataKeys[j]]}`;
            infoBlock.append(listItem);
        }

        const img = new Image();
        img.classList.add('card-list__img');
        // img.setAttribute('data', `${dataBase.products[i].thumbnail}`);
        wrapper.append(img);
        img.src = dataBase.products[i].thumbnail;
        // setTimeout(imgLoader, 3000);
        // imgLoader();
        wrapper.append(header);
        wrapper.append(infoBlock);
        wrapper.append(panel);

        return wrapper;
    }

    result(i: number): HTMLDivElement {
        return this.fillData(this.dataBase, i);
    }

    render(i: number): void {
        const wrap = document.querySelector('.right-content') as HTMLDivElement;
        const card = this.result(i);
        wrap.append(card);
        if (addToBox.includes(String(i))) {
            const getCard = document.getElementById(`${String(i)}`);
            const addBtn = document.querySelectorAll('.add-btn');
            getCard?.classList.add('card_active');
            addBtn[i].classList.add('add-btn_active');
            addBtn[i].textContent = 'удалить';
        }
        const cards = document.querySelectorAll('.card') as NodeListOf<HTMLDivElement>;
        const cardLists = document.querySelectorAll('.card-list') as NodeListOf<HTMLUListElement>;
        const cardHead = document.querySelectorAll('.card__header') as NodeListOf<Element>;
        const bigBtn = document.querySelector('.bigger-btn') as HTMLButtonElement;

        if (bigBtn.classList.contains('bigger-btn_active')) {
            cards.forEach((elem, idx) => {
                elem.classList.add('card_bigger');
                cardLists[idx].classList.add('card-list_bigger');
                cardHead[idx].classList.add('card__header_bigger');
            });
        }
        setFullPrice();
        goToDesc();
    }
}
export default Card;
