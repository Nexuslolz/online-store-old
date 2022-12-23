// import { Link } from './loader/loader-window';
import Data from '../../types/data-types';
import dataBase from '../../data';
import elemLoader from './loader/loader-element';
// import winLoader from './loader/loader-window';
import imgLoader from './loader/loader-img';

// let index = 0;

interface IDataWrapper {
    products: Data;
}

class Card {
    dataBase: IDataWrapper;
    constructor() {
        this.dataBase = dataBase;
    }

    createWrapper(): HTMLDivElement {
        const wrapper = document.createElement('div') as HTMLDivElement;
        wrapper.classList.add('left-content__card');
        wrapper.classList.add('card');
        wrapper.style.visibility = 'hidden';
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
        infoBtn.textContent = 'Детали';

        addBtn.addEventListener('click', (event) => {
            addBtn.classList.toggle('add-btn_active');
            const amount = document.querySelector('.box__amount') as HTMLDivElement;
            const wrapper = document.querySelectorAll('.card') as NodeListOf<HTMLDivElement>;

            let evt;
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
                } else {
                    // localStorage.removeItem(`${addBtn.id}_card-class`);
                    amount.textContent = `${Number(amount.textContent) - 1}`;
                    addBtn.textContent = 'добавить';
                    evt.classList.remove('card_active');
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
        const wrapper = this.createWrapper();
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
        img.setAttribute('data', `${dataBase.products[i].thumbnail}`);
        wrapper.append(img);
        // setTimeout(imgLoader, 3000);
        imgLoader();
        wrapper.append(header);
        wrapper.append(infoBlock);
        wrapper.append(panel);

        return wrapper;
    }

    result(i: number): HTMLDivElement {
        return this.fillData(this.dataBase, i);
    }

    render(i: number) {
        const wrap = document.querySelector('.right-content');
        const card = this.result(i);
        wrap?.append(card);
    }
}

export default Card;
