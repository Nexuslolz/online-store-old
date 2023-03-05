/* eslint-disable @typescript-eslint/no-unused-vars */

type ElemLoader = {
    root: null;
    rootMargin: string;
    threshold: number;
};

function elemLoader(): void {
    const cards = document.querySelectorAll('.card');
    const options: ElemLoader = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
    };
    const observer: IntersectionObserver = new IntersectionObserver(handleElem, options);

    function loadElem(myElem: HTMLElement | Element): void {
        if (myElem instanceof HTMLElement) {
            myElem.style.visibility = 'visible';
        }
    }

    function handleElem(myElem: IntersectionObserverEntry[], observer: IntersectionObserver): void {
        myElem.forEach((inlineElem: IntersectionObserverEntry) => {
            if (inlineElem.intersectionRatio > 0) {
                loadElem(inlineElem.target);
            }
        });
    }

    cards.forEach((elem: Element) => {
        observer.observe(elem);
    });
}

export default elemLoader;
