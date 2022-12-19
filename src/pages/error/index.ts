import Page from '../../templates/page';

export const enum ErrorTypes {
    Error_404 = 404,
}

class ErrorPage extends Page {
    private errorType: ErrorTypes | string;

    constructor(id: string, errorType: ErrorTypes | string) {
        super(id);
        this.errorType = errorType;
    }

    createErrorTitle(): void {
        const mainContent = document.querySelector('header') as HTMLElement;
        mainContent.innerHTML = `${this.errorType}`;
    }

    render(): HTMLElement {
        console.log('err');
        this.createErrorTitle();
        return this.container;
    }
}

export default ErrorPage;
