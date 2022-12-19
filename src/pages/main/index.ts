import Page from '../../templates/page';

class MainPage extends Page {
    constructor(id: string) {
        super(id);
    }
    render(): HTMLElement {
        console.log('main');
        return this.container;
    }
}

export default MainPage;
