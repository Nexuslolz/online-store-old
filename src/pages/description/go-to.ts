import App from '../app/app';

function goToDesc(): void {
    const card = document.querySelectorAll('.card-list');
    card.forEach((item) => {
        item.addEventListener('click', () => {
            const hash = '#description-page';
            window.location.hash = hash;
            App.renderNewPage(hash);
        });
    });
}
export default goToDesc;
