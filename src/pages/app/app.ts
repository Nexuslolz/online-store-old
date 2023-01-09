import Page from '../../templates/page';
import MainPage from '../main/index';
import Header from '../../components/header/index';
import BoxPage from '../box/index';
import DescribePage from '../description/index';
import ErrorPage, { ErrorTypes } from '../error/index';
import Footer from '../../components/footer/index';
import Card from '../../components/main/card';
import dataBase from '../../data';
// import isLoaded from '../../components/main/loader/check-loading';
import CategoryFilter from '../../components/main/category-filter';
import BrandFilter from '../../components/main/brand-filter';
import PriceFilter from '../../components/main/price-filter';
import StockFilter from '../../components/main/stock-filter';
import cardsCounter from '../../components/main/cards-counter';
import selectSort from '../../components/main/sorting/selected-sort';
import checkboxFilter from '../../components/main/filtration/main-filter';

export const enum PageIds {
    MainPage = 'main-page',
    BoxPage = 'box-page',
    DescriptionPage = 'description-page',
}

class App {
    private categoryFilter: CategoryFilter;
    private brandFilter: BrandFilter;
    private priceFilter: PriceFilter;
    private stockFilter: StockFilter;
    private card: Card;
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
                this.compile();
                // const checkboxesFilters = document.querySelectorAll(
                //     '.filter-list__input'
                // ) as NodeListOf<HTMLInputElement>;
                // checkboxesFilters.forEach((filter) => {
                //     filter.checked = false;
                // });
            }
        });
    }

    constructor() {
        this.header = new Header('header', 'page-header');
        this.initialPage = new MainPage('main-page');
        this.footer = new Footer('footer', 'page-footer');
        this.card = new Card();
        this.categoryFilter = new CategoryFilter();
        this.brandFilter = new BrandFilter();
        this.priceFilter = new PriceFilter();
        this.stockFilter = new StockFilter();
    }

    compile(): void {
        for (let i = 0; i < dataBase.products.length; i++) {
            this.card.render(i);
        }
        this.categoryFilter.render();
        this.brandFilter.render();
        this.priceFilter.render();
        this.stockFilter.render();
        cardsCounter();
        selectSort();
        const params = document.querySelectorAll('.filter-list__input') as NodeListOf<HTMLInputElement>;
        params.forEach((input) => {
            input.addEventListener('change', () => {
                checkboxFilter();
            });
        });
        console.log('Оценка: 140 баллов');
    }

    run(): void {
        App.container.append(this.header.render());
        App.renderNewPage('main-page');
        App.container.append(this.footer.render());
        this.enableRouteChange();
        this.compile();
    }
}

export default App;
