// import { Link } from './loader/loader-window';
import Data from '../../types/data-types';
import dataBase from '../../data';
import elemLoader from './loader/loader-element';
import winLoader from './loader/loader-window';

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

        const addBtn = document.createElement('button');
        addBtn.classList.add('card-panel__btn');
        addBtn.classList.add('add-btn');
        addBtn.textContent = 'Add to cart';
        const infoBtn = document.createElement('button');
        infoBtn.classList.add('card-panel__btn');
        infoBtn.classList.add('info-btn');
        infoBtn.textContent = 'Details';

        addBtn.addEventListener('click', (event) => {
            addBtn.classList.toggle('add-btn_active');
            const amount = document.querySelector('.box__amount');
            const wrapper = document.querySelectorAll('.card');

            if (addBtn.classList.contains('add-btn_active') && amount !== null && wrapper !== null) {
                amount.textContent = `${Number(amount.textContent) + 1}`;
                addBtn.textContent = 'Drop from';
                event.target.closest('.card').style.boxShadow = '0 0 6px 5px #5ce77a';
            } else {
                if (amount !== null && wrapper !== null) {
                    amount.textContent = `${Number(amount.textContent) - 1}`;
                    addBtn.textContent = 'Add to cart';
                event.target.closest('.card').style.boxShadow = '';
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
        wrapper.append(img);
        winLoader.open();

        if (!img.src) {
            setTimeout(() => {
                img.src = dataBase.products[i].thumbnail;
            }, 3000);
            setTimeout(() => {
                winLoader.close();
            }, 4500);
        }

        wrapper.append(header);
        wrapper.append(infoBlock);
        wrapper.append(panel);

        return wrapper;
    }
    result(i: number) {
        const wrap = document.querySelector('.right-content');
        const card = this.render(i);
        wrap?.append(card);
    }
    render(i: number): HTMLDivElement {
        return this.fillData(this.dataBase, i);
    }
}

export default Card;
