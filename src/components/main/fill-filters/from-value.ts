import getValue from './get-value';
import fillFilters from './fill-filters';

function controlFromValue(
    fromRange: HTMLInputElement,
    fromInput: HTMLInputElement,
    toInput: HTMLInputElement,
    controlRange: HTMLInputElement
) {
    const [from, to] = getValue(fromInput, toInput);
    fillFilters(fromInput, toInput, '#C6C6C6', '#5ce77a', controlRange);
    if (from > to) {
        fromRange.value = String(to);
        fromInput.value = String(to);
    } else {
        fromRange.value = String(from);
    }
}

export default controlFromValue;
