function fillFilters(
    from: HTMLInputElement,
    to: HTMLInputElement,
    scaleColor: string,
    rangeColor: string,
    controller: HTMLInputElement
) {
    const rangeDistance = +to.max - +to.min;
    const fromPosition = +from.value - +to.min;
    const toPosition = +to.value - +to.min;

    controller.style.background = `linear-gradient(
        to right,
      ${scaleColor} 0%,
      ${scaleColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(fromPosition / rangeDistance) * 100}%,
      ${rangeColor} ${(toPosition / rangeDistance) * 100}%, 
      ${scaleColor} ${(toPosition / rangeDistance) * 100}%, 
      ${scaleColor} 100%)`;
}

export default fillFilters;
