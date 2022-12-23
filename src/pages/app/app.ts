import Page from '../../templates/page';
import MainPage from '../main/index';
import Header from '../../components/header/index';
import BoxPage from '../box/index';
import DescribePage from '../description/index';
import ErrorPage, { ErrorTypes } from '../error/index';
import Footer from '../../components/footer/index';
import Card from '../../components/main/card';
import dataBase from '../../data';

export const enum PageIds {
    MainPage = 'main-page',
    BoxPage = 'box-page',
    DescriptionPage = 'description-page',
}

class App {
    protected card: Card;
    private static container: HTMLElement = document.body;
    private initialPage: MainPage;
    private header: Header;
    private footer: Footer;
    private static defaultPageId = 'current-page';

    static renderNewPage(idPage: string): void {
        const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
        if (currentPageHTML) {
            currentPageHTML.remove();
        }
        let page: Page | null = null;
        if (idPage === 'main-page') {
            page = new MainPage(idPage);
        } else if (idPage === 'box-page') {
            page = new BoxPage(idPage);
        } else if (idPage === 'description-page') {
            page = new DescribePage(idPage);
        } else {
            page = new ErrorPage(idPage, ErrorTypes.Error_404);
        }

        if (page) {
            const pageHTML = page.render();
            pageHTML.id = App.defaultPageId;
            const header = document.querySelector('.page-header') as HTMLElement;
            header.after(pageHTML);
        }
    }

    private enableRouteChange(): void {
        window.location.hash = `${PageIds.MainPage}`;
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            App.renderNewPage(hash);
            if (hash === `${PageIds.MainPage}`) {
                for (let i = 0; i < dataBase.products.length; i++) {
                    this.card.result(i);
                }
            }
        });
    }

    constructor() {
        this.header = new Header('header', 'page-header');
        this.initialPage = new MainPage('main-page');
        this.footer = new Footer('footer', 'page-footer');
        this.card = new Card();
    }

    run(): void {
        App.container.append(this.header.render());
        App.renderNewPage('main-page');
        for (let i = 0; i < dataBase.products.length; i++) {
            this.card.result(i);
        }
        App.container.append(this.footer.render());
        this.enableRouteChange();
    }
}

export default App;
