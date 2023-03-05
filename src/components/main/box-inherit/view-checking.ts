function checkingView(isBig: boolean): void {
    const cards = document.querySelectorAll('.card') as NodeListOf<HTMLDivElement>;
    const cardLists = document.querySelectorAll('.card-list') as NodeListOf<HTMLUListElement>;
    const cardHead = document.querySelectorAll('.card__header') as NodeListOf<Element>;

    if (isBig) {
        cards.forEach((elem, idx) => {
            elem.classList.add('card_bigger');
            cardLists[idx].classList.add('card-list_bigger');
            cardHead[idx].classList.add('card__header_bigger');
            return isBig;
        });
    }
}

export default checkingView;
