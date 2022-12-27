import getValue from './get-value';
import fillFilters from './fill-filters';

function controlFromRange(fromRange: HTMLInputElement, toRange: HTMLInputElement, fromInput: HTMLInputElement) {
    const [from, to] = getValue(fromRange, toRange);
    fillFilters(fromRange, toRange, '#C6C6C6', '#5ce77a', toRange);
    if (from > to) {
        fromRange.value = String(to);
        fromInput.value = String(to);
    } else {
        fromInput.value = String(from);
    }
}

export default controlFromRange;
