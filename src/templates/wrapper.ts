abstract class Wrapper {
    protected wrapper: HTMLElement;

    constructor() {
        this.wrapper = document.createElement('div') as HTMLDivElement;
    }

    createElement(elem: HTMLElement): HTMLElement {
        return elem;
    }

    createWrapper(): void {
        console.log(this.wrapper);
    }

    render(): HTMLElement {
        return this.wrapper;
    }
}
export default Wrapper;
