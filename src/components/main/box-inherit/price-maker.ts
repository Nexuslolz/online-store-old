import dataBase from '../../../data';

function setFullPrice() {
    const price = document.querySelector('.page-header__price') as HTMLSpanElement;
    const addBtn = document.querySelectorAll('.add-btn') as NodeListOf<HTMLButtonElement>;
    let priceNum: number;
    if (price.textContent !== null) {
        priceNum = Number(price.textContent.replace('$', ''));
    }
    addBtn.forEach((btn, idx) => {
        btn.addEventListener('click', () => {
            const dataPrice = dataBase.products[idx].price;
            if (btn.classList.contains('add-btn_active')) {
                priceNum += dataPrice;
            } else {
                priceNum -= dataPrice;
            }
            price.textContent = `${priceNum}$`;
        });
    });
}

export default setFullPrice;
