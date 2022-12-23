import '../../../style/pages/main/loader.scss';

export const enum Link {
    loadLink = `https://dummyjson.com/products?limit=100`,
}

class WinLoader {
    create(): HTMLDivElement {
        const shield = document.createElement('div') as HTMLDivElement;
        shield.classList.add('loader');
        const shieldText = document.createElement('span') as HTMLSpanElement;
        shieldText.classList.add('loader-text');
        shieldText.textContent = 'Loading ...';

        const container = document.querySelector('body') as HTMLElement;
        shield.append(shieldText);
        container.append(shield);
        return shield;
    }
    open(): void {
        const shield = this.create() as HTMLDivElement;
        shield.style.position = 'fixed';
    }
    close(): void {
        const shield = document.querySelector('.loader') as HTMLDivElement;
        shield.remove();
    }
}

const winLoader = new WinLoader();

export default winLoader;

// fetch(Link.loadLink)
//     .then((response) => {
//         // console.log(response);
//         if (response.status !== 200) {
//             return Promise.reject(new Error(response.statusText));
//         } else {
//             this.isLoading = true;
//             return Promise.resolve(response);
//         }
//     })
//     .then((response) => {
//         console.log(response.json());
//         return response.json().state;
//     });
