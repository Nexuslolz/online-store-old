import dataBase from '../../../data';
import Data from '../../../types/data-types';
import Card from '../card';
import cardsCounter from '../cards-counter';
import { CATEGORY_FILTER_CHECKBOX_NAME } from '../category-filter';
import { PRICE_FILTER_NAME } from '../price-filter';
import { STOCK_FILTER_NAME } from '../stock-filter';
import { BRAND_FILTER_CHECKBOX_NAME } from '../brand-filter';
import checkingView from '../box-inherit/view-checking';
import { isBig } from '../main-wrapper';
import selectSort from '../sorting/selected-sort';

type Filter<T> = (list: T) => T;

function getCategoryFilter(params: Array<HTMLInputElement>): Filter<Data> {
    const categoryParams = params
        .filter((item) => item.name === CATEGORY_FILTER_CHECKBOX_NAME)
        .filter((item) => item.checked)
        .map((item) => item.value);

    if (categoryParams.length === 0) {
        return (productsList) => productsList;
    }

    return (productsList: Data) => {
        return productsList.filter(({ category }) => categoryParams.includes(category));
    };
}

function getBrandFilter(params: Array<HTMLInputElement>): Filter<Data> {
    const brandParams = params
        .filter((item) => item.name === BRAND_FILTER_CHECKBOX_NAME)
        .filter((item) => item.checked)
        .map((item) => item.value);

    if (brandParams.length === 0) {
        return (productsList) => productsList;
    }

    return (productsList: Data) => {
        return productsList.filter(({ brand }) => brandParams.includes(brand));
    };
}

function getPriceFilter(params: Array<HTMLInputElement>): Filter<Data> {
    const priceParams = params.filter((item) => item.name === PRICE_FILTER_NAME).map((item) => Number(item.value));

    const min = Math.min(...priceParams);
    const max = Math.max(...priceParams);

    return (productsList: Data) => {
        return productsList.filter(({ price }) => price >= min && price <= max);
    };
}

function getStockFilter(params: Array<HTMLInputElement>): Filter<Data> {
    const stockParams = params.filter((item) => item.name === STOCK_FILTER_NAME).map((item) => Number(item.value));

    const min = Math.min(...stockParams);
    const max = Math.max(...stockParams);

    return (productsList: Data) => {
        return productsList.filter(({ stock }) => stock >= min && stock <= max);
    };
}

function checkboxFilter(): void {
    const content = document.querySelector('.right-content') as HTMLDivElement;
    content.innerHTML = '';

    const { products } = dataBase;

    const checkboxFilters = [...(document.querySelectorAll('.filter-list__input') as NodeListOf<HTMLInputElement>)];
    const categoryFilter = getCategoryFilter(checkboxFilters);
    const brandFilter = getBrandFilter(checkboxFilters);

    const rangeFilters = [...(document.querySelectorAll('.filter__input') as NodeListOf<HTMLInputElement>)];
    const priceFilter = getPriceFilter(rangeFilters);
    const stockFilter = getStockFilter(rangeFilters);

    const filteredProducts = priceFilter(stockFilter(brandFilter(categoryFilter(products))));
    selectSort(filteredProducts);

    const cardItem = new Card();
    products.forEach((item, index) => {
        if (filteredProducts.includes(item)) {
            cardItem.render(index);
        }
    });

    cardsCounter();
    checkingView(isBig);
}

export default checkboxFilter;
