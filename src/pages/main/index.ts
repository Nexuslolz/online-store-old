import Page from '../../templates/page';
import MainWrapper from '../../components/main/main-wrapper';
// import data from '../../data';
// import winLoader from '../../components/main/loader/loader-window';

class MainPage extends Page {
    private wrapperLeft: MainWrapper;
    private wrapperRight: MainWrapper;

    constructor(id: string) {
        super(id);
        this.wrapperLeft = new MainWrapper();
        this.wrapperRight = new MainWrapper();
    }

    appendWrapper(): HTMLElement {
        const wrapperLeft = this.wrapperLeft.render(`left`);
        const wrapperRight = this.wrapperRight.render(`right`);
        this.content.append(wrapperLeft);
        this.content.append(wrapperRight);
        return this.content;
    }

    render(): HTMLElement {
        this.createWrapperContent();
        this.appendWrapper();
        return this.container;
    }
}

export default MainPage;
