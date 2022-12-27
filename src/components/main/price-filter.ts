import Filter from '../../templates/filter';
import dataBase from '../../data';

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

    createElements(item: string, direction: string): HTMLDivElement {
        const range = document.createElement('input') as HTMLInputElement;
        range.classList.add('filter__input');
        range.classList.add(`input-${item}`);
        range.setAttribute('type', 'range');
        range.id = `${direction}-slider`;
        range.setAttribute(`min`, '20');
        range.setAttribute(`max`, '1200');

        const rangeLength = 2;
        if (this.rangeWrapper.querySelectorAll('.filter__input').length < rangeLength) {
            this.rangeWrapper.append(range);
        }

        return this.rangeWrapper;
    }

    createMoreElements(val: string, min: number, max: number, direction: string): HTMLDivElement {
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    appendElements(item: string, direction: string, val: string, min: number, max: number): HTMLDivElement {
        this.header.textContent = 'Цена';

        this.createElements(item, direction);
        this.createMoreElements(val, min, max, direction);

        this.wrapper.append(this.header);
        this.wrapper.append(this.rangeWrapper);
        this.wrapper.append(this.valueWrapper);

        return this.wrapper;
    }

    render(): HTMLDivElement {
        const mainWrapper = document.querySelector('.left-content') as HTMLDivElement;
        const newBlockMin = this.appendElements('min', 'from', 'min', 20, 1200);
        const newBlockMax = this.appendElements('max', 'to', 'max', 20, 1200);
        mainWrapper.append(newBlockMin);
        mainWrapper.append(newBlockMax);
        return mainWrapper;
    }
}

export default PriceFilter;
