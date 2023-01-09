function createInput(className: string, type: string, placeholder: string): HTMLInputElement {
    const input = document.createElement('input') as HTMLInputElement;
    input.classList.add('product-form__input');
    input.classList.add(className);

    input.setAttribute('type', `${type}`);
    input.setAttribute('placeholder', `${placeholder}`);

    return input;
}

class Buy {
    private wrapper: HTMLFormElement;
    private overlay: HTMLDivElement;
    private details: HTMLDivElement;
    private cardInfo: HTMLDivElement;

    constructor() {
        this.wrapper = document.createElement('form');
        this.overlay = document.createElement('div');
        this.details = document.createElement('div');
        this.cardInfo = document.createElement('div');
    }

    addClasses(): void {
        this.wrapper.classList.add('product-form');
        this.overlay.classList.add('product-form__overlay');

        this.details.classList.add('product-form__details');
        this.details.classList.add('details');

        this.cardInfo.classList.add('product-form__card-info');
        this.cardInfo.classList.add('card-info');
    }

    createDetailsBlock(): HTMLDivElement {
        const header = document.createElement('h2') as HTMLElement;
        header.classList.add('details__header');
        header.textContent = `Персональная информация`;

        const content = document.createElement('div') as HTMLDivElement;
        content.classList.add('details-content');

        const nameInput = createInput('name-input', 'text', 'Имя Фамилия');
        const telInput = createInput('tel-input', 'tel', 'Телефон');
        const addressInput = createInput('address-input', 'text', 'Адрес доставки');
        const emailInput = createInput('email-input', 'email', 'Электронная почта');

        content.append(nameInput);
        content.append(telInput);
        content.append(addressInput);
        content.append(emailInput);

        this.details.append(header);
        this.details.append(content);

        return this.details;
    }

    createCardBlock(): HTMLDivElement {
        const header = document.createElement('h2') as HTMLElement;
        header.classList.add('card-info__header');
        header.textContent = `Данные карты`;

        const content = document.createElement('div') as HTMLDivElement;
        content.classList.add('card-info-content');

        const cardNumber = createInput('card-number-input', 'text', 'Номер карты');
        const cardDate = createInput('card-date-input', 'date', 'Дата');
        const cardCode = createInput('card-code-input', 'text', 'CVV');

        content.append(cardNumber);
        content.append(cardDate);
        content.append(cardCode);

        this.cardInfo.append(header);
        this.cardInfo.append(content);

        return this.cardInfo;
    }

    appendElements(): void {
        const detailsBlock = this.createDetailsBlock();
        const cardBlock = this.createCardBlock();

        const confirmBtn = document.createElement('button') as HTMLButtonElement;
        confirmBtn.classList.add('product-form__btn');
        confirmBtn.setAttribute('type', 'submit');
        confirmBtn.textContent = `Подтвердить`;

        this.wrapper.append(detailsBlock);
        this.wrapper.append(cardBlock);
        this.wrapper.append(confirmBtn);

        const body = document.querySelector('body');
        body?.append(this.overlay);
        body?.append(this.wrapper);

        this.overlay.addEventListener('click', () => {
            this.overlay.classList.remove('product-form__overlay_active');
            this.wrapper.classList.remove('product-form_active');
            setTimeout(() => {
                this.overlay.remove();
                this.wrapper.remove();
            }, 350);
        });

        this.addClasses();
    }

    render(): void {
        this.appendElements();
        this.overlay.classList.add('product-form__overlay_active');
        this.wrapper.classList.add('product-form_active');
    }
}

export default Buy;
