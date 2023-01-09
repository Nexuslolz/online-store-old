import dataBase from '../../../data';

function setFullPrice() {
    const price = document.querySelector('.page-header__price') as HTMLSpanElement;
    const addBtn = document.querySelectorAll('.add-btn') as NodeListOf<HTMLButtonElement>;
    let priceNum: number;
    if (price.textContent !== null) {
        priceNum = Number(price.textContent.replace('$', ''));
    }
    addBtn.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            let evt: Element | null | undefined;
            if (event.target !== null && event.target instanceof HTMLElement) {
                evt = event.target.closest('.card');
            }

            if (evt !== null && evt !== undefined) {
                dataBase.products.forEach((item) => {
                    if (evt !== null && evt !== undefined && item.id === Number(evt.id) + 1) {
                        if (btn.classList.contains('add-btn_active')) {
                            priceNum += dataBase.products[Number(evt.id)].price;
                        } else {
                            priceNum -= dataBase.products[Number(evt.id)].price;
                        }
                    }
                });
            }
            price.textContent = `${priceNum}$`;
        });
    });
}

export default setFullPrice;
