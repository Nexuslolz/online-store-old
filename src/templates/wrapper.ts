/* eslint-disable @typescript-eslint/no-unused-vars */
abstract class Wrapper {
    protected wrapper: HTMLElement;

    constructor() {
        this.wrapper = document.createElement('div') as HTMLDivElement;
    }

    createElement(elem: HTMLElement): HTMLElement {
        return elem;
    }

    createWrapper(side?: string): void {
        console.log(this.wrapper);
    }

    render(side?: string): HTMLElement {
        return this.wrapper;
    }
}
export default Wrapper;
