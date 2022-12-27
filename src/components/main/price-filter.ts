import Filter from '../../templates/filter';
import dataBase from '../../data';
import controlFromRange from './fill-filters/from-range';
import controlFromValue from './fill-filters/from-value';
import controlToRange from './fill-filters/to-range';
import controlToValue from './fill-filters/to-value';
import fillFilters from './fill-filters/fill-filters';
import setPriorityRange from './fill-filters/priority-range';

class PriceFilter extends Filter {
    rangeWrapper: HTMLDivElement;
    valueWrapper: HTMLDivElement;
    constructor() {
        super();
        this.rangeWrapper = document.createElement('div');
        this.rangeWrapper.classList.add('filter-input-wrapper');

        this.valueWrapper = document.createElement('div');
        this.valueWrapper.classList.add('filter-value-wrapper');
    }

    createRangeElements(item: string, direction: string): HTMLDivElement {
        const range = document.createElement('input') as HTMLInputElement;
        range.classList.add('filter__input');
        range.classList.add(`input-${item}`);
        range.setAttribute('type', 'range');
        range.id = `${direction}-slider`;
        range.setAttribute(`min`, '20');
        range.setAttribute(`max`, '1200');

        if (item == 'min') {
            range.setAttribute('value', '120');
        } else {
            range.setAttribute('value', '1100');
        }

        const rangeLength = 2;
        if (this.rangeWrapper.querySelectorAll('.filter__input').length < rangeLength) {
            this.rangeWrapper.append(range);
        }

        return this.rangeWrapper;
    }

    createValueElements(val: string, min: number, max: number, direction: string): HTMLDivElement {
        const value = document.createElement('div') as HTMLDivElement;
        value.classList.add('filter__value');
        value.classList.add(`value-${val}`);

        const valueHead = document.createElement('h4') as HTMLElement;
        valueHead.classList.add('filter__subheader');
        valueHead.classList.add(`value-${val}__header`);
        valueHead.textContent = `${val.toUpperCase()}`;

        const valueInput = document.createElement('input') as HTMLInputElement;
        valueInput.classList.add(`value-${val}__input`);
        valueInput.setAttribute('type', 'number');
        valueInput.setAttribute('min', `${min}`);
        valueInput.setAttribute('max', `${max}`);
        valueInput.id = `${direction}-input`;

        const valueArr: number[] = [];
        dataBase.products.forEach((elem) => {
            valueArr.push(elem.price);
        });
        const resultArr = [...new Set(valueArr)];
        let numMin = 50;
        let numMax = 0;

        if (val === 'min') {
            resultArr.forEach((elem) => {
                if (elem < numMin) {
                    numMin = elem;
                }
            });
            valueInput.value = String(numMin);
        } else if (val === 'max') {
            resultArr.forEach((elem) => {
                if (elem > numMax) {
                    numMax = elem;
                }
            });
            valueInput.value = String(numMax);
        }

        value.append(valueHead);
        value.append(valueInput);

        const valueLength = 2;
        if (this.valueWrapper.querySelectorAll('.filter__value').length < valueLength) {
            this.valueWrapper.append(value);
        }
        return this.valueWrapper;
    }

    appendElements(item: string, direction: string, val: string, min: number, max: number): HTMLDivElement {
        this.header.textContent = 'Цена';

        this.createRangeElements(item, direction);
        this.createValueElements(val, min, max, direction);

        this.wrapper.append(this.header);
        this.wrapper.append(this.rangeWrapper);
        this.wrapper.append(this.valueWrapper);

        return this.wrapper;
    }

    onChange(num: number) {
        const fromRange = document.querySelectorAll('#from-slider') as NodeListOf<HTMLInputElement>;
        const toRange = document.querySelectorAll('#to-slider') as NodeListOf<HTMLInputElement>;
        const fromValue = document.querySelectorAll('#from-input') as NodeListOf<HTMLInputElement>;
        const toValue = document.querySelectorAll('#to-input') as NodeListOf<HTMLInputElement>;

        fillFilters(fromRange[num], toRange[num], '#c6c6c6', '#5ce77a', toRange[num]);
        setPriorityRange(toRange[num]);

        fromRange[num].oninput = () => controlFromRange(fromRange[num], toRange[num], fromValue[num]);
        toRange[num].oninput = () => controlToRange(fromRange[num], toRange[num], toValue[num]);
        fromValue[num].oninput = () => controlFromValue(fromRange[num], fromValue[num], toValue[num], toRange[num]);
        toValue[num].oninput = () => controlToValue(toRange[num], fromValue[num], toValue[num], toRange[num]);
    }

    render(): HTMLDivElement {
        const mainWrapper = document.querySelector('.left-content') as HTMLDivElement;
        const newBlockMin = this.appendElements('min', 'from', 'min', 20, 1200);
        const newBlockMax = this.appendElements('max', 'to', 'max', 20, 1200);
        mainWrapper.append(newBlockMin);
        mainWrapper.append(newBlockMax);
        this.onChange(0);
        return mainWrapper;
    }
}

export default PriceFilter;
