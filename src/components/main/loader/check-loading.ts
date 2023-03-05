import winLoader from './loader-window';
import dataBase from '../../../data';

function isLoaded() {
    const wrapper = document.querySelector('.card') as HTMLDivElement;
    winLoader.open();

    if (wrapper.childNodes.length !== dataBase.products.length) {
        setTimeout(() => {
            return;
        }, 3000);
        setTimeout(() => {
            winLoader.close();
        }, 4500);
    }
}

export default isLoaded;
