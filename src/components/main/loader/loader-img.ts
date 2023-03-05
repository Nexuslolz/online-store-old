/* eslint-disable @typescript-eslint/no-unused-vars */

type ImgLoader = {
    root: null;
    rootMargin: string;
    threshold: number;
};

function imgLoader(): void {
    const img = document.querySelectorAll('.card-list__img');
    const options: ImgLoader = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
    };
    const observer: IntersectionObserver = new IntersectionObserver(handleImage, options);

    function loadImg(myImg: HTMLImageElement | Element): void {
        const attr = myImg.getAttribute('data');
        if (myImg instanceof HTMLImageElement && attr !== null) {
            myImg.src = attr;
        }
    }

    function handleImage(myImg: IntersectionObserverEntry[], observer: IntersectionObserver): void {
        myImg.forEach((inlineImg: IntersectionObserverEntry) => {
            if (inlineImg.intersectionRatio > 0) {
                loadImg(inlineImg.target);
            }
        });
    }

    img.forEach((img: Element) => {
        observer.observe(img);
    });
}

export default imgLoader;
