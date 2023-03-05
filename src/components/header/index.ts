import Component from '../../templates/component';
import logotype from '../../assets/icons/logo.svg';
import basket from '../../assets/icons/basket.png';

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
            `${logotype}`,
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
            `${basket}`,
            false,
            'box'
        );

        const boxInfo = document.createElement('p') as HTMLParagraphElement;
        boxInfo.classList.add('page-header__info');
        const price = document.createElement('span') as HTMLSpanElement;
        price.classList.add('page-header__price');
        price.textContent = `0$`;
        boxInfo.textContent = `Общая стоимость: `;
        boxInfo.append(price);

        const amount = document.createElement('p') as HTMLParagraphElement;
        amount.classList.add('box__amount');
        amount.textContent = `0`;

        box.append(amount);
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
