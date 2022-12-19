import Component from '../../templates/component';

class Footer extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    appendElems(): void {
        const wrapper = document.createElement('div') as HTMLDivElement;
        wrapper.classList.add(`page-footer__wrapper`);

        const gh1: HTMLElement = this.createElement(
            'div',
            'page-footer__prod',
            'a',
            'footer__link',
            'img',
            'footer__img',
            'Sasha-gh',
            'https://github.com/Nexuslolz',
            '../src/assets/icons/GitHub.svg',
            true
        );
        const gh2: HTMLElement = this.createElement(
            'div',
            'page-footer__prod',
            'a',
            'footer__link',
            'img',
            'footer__img',
            'Marina-gh',
            'https://github.com/Astafyeva-Marina',
            '../src/assets/icons/GitHub.svg',
            true
        );
        const courseLink: HTMLElement = this.createElement(
            'div',
            'page-footer__prod',
            'a',
            'footer__link',
            'img',
            'footer__img',
            'JS course',
            'https://rs.school/js/',
            '../src/assets/icons/rs_school_js-logo.svg',
            true
        );

        const prodInfo = document.createElement('p') as HTMLParagraphElement;
        prodInfo.classList.add('page-footer__info');
        prodInfo.textContent = `© 2022`;

        wrapper.append(gh1);
        wrapper.append(gh2);
        wrapper.append(prodInfo);
        wrapper.append(courseLink);

        this.container.append(wrapper);
    }

    render(): HTMLElement {
        this.appendElems();
        return this.container;
    }
}

export default Footer;
