import Component from '../../templates/component';

class Header extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }
    appendElems(): void {
        const logo: HTMLElement = this.createElement(
            'div',
            'page-header__logo',
            'a',
            'logo__link',
            'img',
            'logo__img',
            'logo-img',
            '#main-page',
            'https://raw.githubusercontent.com/Nexuslolz/online-store/db561059b41883a40a40350a47441c33f2b1228a/src/assets/icons/logo.svg?token=AUOQGHECCH66BUDWOCJ2MQTDUBL62',
            false,
            'logo'
        );
        const box: HTMLElement = this.createElement(
            'div',
            'page-header__box',
            'a',
            'box__link',
            'img',
            'box__img',
            'box-img',
            '#box-page',
            'https://raw.githubusercontent.com/Nexuslolz/online-store/develop/src/assets/icons/basket.png?token=GHSAT0AAAAAABU3JU5MR6GYJNYFVYHONNS6Y5AK7YQ',
            false
        );
        const boxInfo = document.createElement('p') as HTMLParagraphElement;
        boxInfo.classList.add('page-header__info');
        const price = document.createElement('span') as HTMLSpanElement;
        price.classList.add('page-header__price');
        price.textContent = `0$`;
        boxInfo.textContent = `Total price: ${price.textContent}`;

        this.container.append(logo);
        this.container.append(boxInfo);
        this.container.append(box);
    }

    render(): HTMLElement {
        this.appendElems();
        return this.container;
    }
}

export default Header;
