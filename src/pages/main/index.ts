import Page from '../../templates/page';
import MainWrapper from './main-wrapper';

class MainPage extends Page {
    private wrapperLeft: MainWrapper;
    private wrapperRight: MainWrapper;

    constructor(id: string) {
        super(id);
        this.wrapperLeft = new MainWrapper(`left`);
        this.wrapperRight = new MainWrapper(`right`);
    }

    appendWrapper(): HTMLElement {
        this.content.append(this.wrapperLeft.render());
        this.content.append(this.wrapperRight.render());
        return this.content;
    }

    render(): HTMLElement {
        this.createWrapperContent();
        this.appendWrapper();
        return this.container;
    }
}

export default MainPage;
