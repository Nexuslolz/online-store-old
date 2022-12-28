function cardsCounter(): void {
    const cards = document.querySelectorAll('.card') as NodeListOf<HTMLDivElement>;
    const counter = document.querySelector('.right-panel__count') as HTMLSpanElement;

    counter.textContent = `${String(cards.length)}`;
}

export default cardsCounter;
