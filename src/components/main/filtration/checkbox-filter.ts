import dataBase from '../../../data';
import Card from '../card';

function checkboxFilter(event: Event): void {
    const cardItem = new Card();
    const data = dataBase.products;
    const content = document.querySelector('.right-content') as HTMLDivElement;

    let value: string;
    let param: HTMLInputElement | null | undefined;
    if (event.target !== null && event.target instanceof HTMLInputElement && event.target !== undefined) {
        param = event.target;
    }
    if (param !== null && param !== undefined) {
        const cards = document.querySelectorAll('.card');
        if (cards.length === data.length) {
            content.innerHTML = '';
        }
        if (param.checked) {
            value = param.value;
            data.forEach((dataItem, idx) => {
                if (
                    (dataItem.category === value && dataItem.brand === value) ||
                    dataItem.category === value ||
                    dataItem.brand === value
                ) {
                    cardItem.render(idx);
                }
            });
        } else if (!param.checked) {
            content.innerHTML = '';
            data.forEach((dataItem, idx) => {
                cardItem.render(idx);
            });
        }
    }
}
export default checkboxFilter;
