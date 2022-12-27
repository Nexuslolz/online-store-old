import fillFilters from './fill-filters';
import getValue from './get-value';
import setPriorityRange from './priority-range';

function controlToValue(
    toRange: HTMLInputElement,
    fromInput: HTMLInputElement,
    toInput: HTMLInputElement,
    controlRange: HTMLInputElement
) {
    const [from, to] = getValue(fromInput, toInput);
    fillFilters(fromInput, toInput, '#C6C6C6', '#5ce77a', controlRange);
    setPriorityRange(toInput);
    if (from <= to) {
        toRange.value = String(to);
        toInput.value = String(to);
    } else {
        toInput.value = String(from);
    }
}

export default controlToValue;
