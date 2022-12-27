import fillFilters from './fill-filters';
import getValue from './get-value';
import setPriorityRange from './priority-range';

function controlToRange(fromRange: HTMLInputElement, toRange: HTMLInputElement, toInput: HTMLInputElement) {
    const [from, to] = getValue(fromRange, toRange);
    fillFilters(fromRange, toRange, '#C6C6C6', '#5ce77a', toRange);
    setPriorityRange(toRange);
    if (from <= to) {
        toRange.value = String(to);
        toInput.value = String(to);
    } else {
        toInput.value = String(from);
        toRange.value = String(from);
    }
}
export default controlToRange;
