import Wrapper from '../../templates/wrapper';

class MainWrapper extends Wrapper {
    protected panel: HTMLDivElement;
    protected content: HTMLDivElement;

    constructor() {
        super();
        this.panel = document.createElement('div') as HTMLDivElement;
        this.content = document.createElement('div') as HTMLDivElement;
    }
    addClasses(side: string) {
        this.wrapper.classList.add(`container-${side}`);
        this.panel.classList.add(`container-${side}__panel`);
        this.panel.classList.add(`${side}-panel`);
        this.content.classList.add(`container-${side}__content`);
        this.content.classList.add(`${side}-content`);
    }
    createElement(elem: HTMLElement): HTMLElement {
        return elem;
    }

    createWrapper() {
        return this.wrapper.append(this.panel), this.wrapper.append(this.content);
    }

    render(side: string) {
        this.addClasses(side);
        this.createWrapper();
        return this.wrapper;
    }
}

export default MainWrapper;
