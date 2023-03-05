abstract class Component {
    protected container: HTMLElement;
    constructor(tagName: string, className: string) {
        this.container = document.createElement(tagName) as HTMLElement;
        this.container.classList.add(className);
    }

    createElement(
        wrapper: string,
        wrapClass: string,
        item: string,
        itemClass: string,
        content: string,
        contentClass: string,
        contentAtr: string,
        href: string,
        src: string,
        openWindow: boolean,
        anyWrapClass?: string | null
    ): HTMLElement {
        const elem = document.createElement(wrapper) as HTMLDivElement;
        elem.classList.add(wrapClass);
        if (anyWrapClass) {
            elem.classList.add(anyWrapClass);
        }

        const link = document.createElement(item) as HTMLLinkElement;
        link.classList.add(itemClass);
        link.href = href;
        if (openWindow) {
            link.setAttribute('target', '_blank');
        }

        const img = document.createElement(content) as HTMLImageElement;
        img.classList.add(contentClass);
        img.setAttribute('alt', contentAtr);
        img.src = src;

        elem.append(link);
        link.append(img);

        return elem;
    }

    appendElems(): void {
        console.log('not implemented');
    }

    render(): HTMLElement {
        return this.container;
    }
}

export default Component;

// const logo = document.createElement('div');
// logo.classList.add('page-header__logo');
// logo.classList.add('logo');

// const logoLink = document.createElement('a');
// logoLink.classList.add('logo__link');
// logoLink.href = '#';

// const logoImg = document.createElement('img');
// logoImg.classList.add('logo__img');
// logoImg.setAttribute('alt', 'logo-img');
// logoImg.src = '';

// this.container.append(logo);
// logo.append(logoLink);
// logoLink.append(logoImg);
// }
