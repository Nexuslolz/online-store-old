import dataBase from '../../../data';
import Data from '../../../types/data-types';
import Card from '../card';

function selectSort(data?: Data): void {
    const cardItem = new Card();

    const selectList = document.querySelector('.options-list') as HTMLSelectElement;
    const content = document.querySelector('.right-content') as HTMLDivElement;
    const { products } = dataBase;

    selectList?.addEventListener('change', () => {
        if (content !== undefined) {
            content.innerHTML = '';
        }
        if (data) {
            if (selectList.value === 'Цена по возрастанию') {
                data.sort((a, b) => a.price - b.price);
            } else if (selectList.value === 'Скидка по возрастанию') {
                data.sort((a, b) => Number(a.discount.replace('%', '')) - Number(b.discount.replace('%', '')));
            } else if (selectList.value === 'Цена по убыванию') {
                data.sort((a, b) => b.price - a.price);
            } else if (selectList.value === 'Скидка по убыванию') {
                data.sort((a, b) => Number(b.discount.replace('%', '')) - Number(a.discount.replace('%', '')));
            } else {
                data;
            }

            products.forEach((item, index) => {
                if (data.includes(item)) {
                    cardItem.render(index);
                }
            });
        } else {
            if (selectList.value === 'Цена по возрастанию') {
                products.sort((a, b) => a.price - b.price);
            } else if (selectList.value === 'Скидка по возрастанию') {
                products.sort((a, b) => Number(a.discount.replace('%', '')) - Number(b.discount.replace('%', '')));
            } else if (selectList.value === 'Цена по убыванию') {
                products.sort((a, b) => b.price - a.price);
            } else if (selectList.value === 'Скидка по убыванию') {
                products.sort((a, b) => Number(b.discount.replace('%', '')) - Number(a.discount.replace('%', '')));
            } else {
                products;
            }
            for (let i = 0; i < products.length; i++) {
                cardItem.render(i);
            }
        }
    });
}

export default selectSort;
