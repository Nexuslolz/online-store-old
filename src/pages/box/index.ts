import Page from '../../templates/page';

class BoxPage extends Page {
    constructor(id: string) {
        super(id);
    }

    render(): HTMLElement {
        console.log('box');
        return this.container;
    }
}

export default BoxPage;
