import Wrapper from '../../templates/wrapper';

class MainWrapper extends Wrapper {
    protected panel: HTMLDivElement;
    protected content: HTMLDivElement;

    constructor(side: string) {
        super();
        this.panel = document.createElement('div') as HTMLDivElement;
        this.content = document.createElement('div') as HTMLDivElement;

        this.wrapper.classList.add(`container-${side}`);
        this.panel.classList.add(`container-${side}__panel`);
        this.content.classList.add(`container-${side}__content`);
    }

    createElement(elem: HTMLElement): HTMLElement {
        return elem;
    }

    createWrapper(): void {
        return this.wrapper.append(this.panel), this.wrapper.append(this.content);
    }

    render() {
        this.createWrapper();
        return this.wrapper;
    }
}

export default MainWrapper;
