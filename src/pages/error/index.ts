import Page from '../../templates/page';

export const enum ErrorTypes {
    Error_404 = '404 NOT FOUND',
}

class ErrorPage extends Page {
    private errorType: ErrorTypes | string;

    constructor(id: string, errorType: ErrorTypes | string) {
        super(id);
        this.errorType = errorType;
    }

    createErrorTitle(): void {
        const errHeader = document.createElement('h1') as HTMLElement;
        errHeader.classList.add('error-header');
        errHeader.textContent = `${this.errorType}`;
        this.container.append(errHeader);
    }

    render(): HTMLElement {
        this.createErrorTitle();
        return this.container;
    }
}

export default ErrorPage;
