abstract class Page {
    protected container: HTMLElement;
    protected content: HTMLElement;

    constructor(id: string) {
        this.container = document.createElement('main') as HTMLElement;
        this.content = document.createElement('div') as HTMLDivElement;
        this.container.classList.add('page-main');
        this.container.id = id;
    }

    createWrapperContent(): void {
        this.content.classList.add('container');
        return this.container.append(this.content);
    }

    appendWrapper(): HTMLElement {
        return this.content;
    }

    render(): HTMLElement {
        this.createWrapperContent();
        return this.container;
    }
}

export default Page;
