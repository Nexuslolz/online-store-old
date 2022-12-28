import dataBase from '../../../data';
import Card from '../card';

function selectSort(): void {
    const cardItem = new Card();

    const selectList = document.querySelector('.options-list') as HTMLSelectElement;
    const content = document.querySelector('.right-content') as HTMLDivElement;
    const data = dataBase.products;

    selectList?.addEventListener('change', () => {
        if (content !== undefined) {
            content.innerHTML = '';
        }

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
        for (let i = 0; i < data.length; i++) {
            cardItem.render(i);
        }
    });
}

export default selectSort;
