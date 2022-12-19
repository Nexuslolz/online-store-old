import Page from '../../templates/page';

class DescribePage extends Page {
    constructor(id: string) {
        super(id);
    }
    render(): HTMLElement {
        console.log('desc');
        return this.container;
    }
}

export default DescribePage;
