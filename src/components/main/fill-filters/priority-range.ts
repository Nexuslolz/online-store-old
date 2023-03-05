function setPriorityRange(currentTarget: HTMLInputElement) {
    const toRange = document.querySelectorAll('#to-slider') as NodeListOf<HTMLInputElement>;
    if (Number(currentTarget.value) <= 0) {
        toRange[0].style.zIndex = '2';
    } else {
        toRange[0].style.zIndex = '0';
    }
}

export default setPriorityRange;
