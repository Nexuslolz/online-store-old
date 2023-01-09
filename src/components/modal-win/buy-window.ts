type CreateInputReturned = [HTMLInputElement, () => boolean];

type CreateInputParams = {
    className: string;
    type: string;
    placeholder: string;
    validate: (value: string) => boolean;
};

function createInput({ className, type, placeholder, validate }: CreateInputParams): CreateInputReturned {
    const input = document.createElement('input') as HTMLInputElement;
    input.classList.add('product-form__input');
    input.classList.add(className);

    input.setAttribute('type', `${type}`);
    input.setAttribute('placeholder', `${placeholder}`);
    input.setAttribute('required', 'true');

    const validateInput = () => {
        const value = input.value;

        if (!validate(value)) {
            input.classList.add('product-form__input_invalid');
            return false;
        } else {
            return true;
        }
    };

    if (input.placeholder === 'Номер карты') {
        const img = document.createElement('img') as HTMLImageElement;
        img.classList.add('form-img');
        img.src =
            'https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71';

        setTimeout(() => {
            document.querySelector('.card-info-content')?.append(img);
        }, 15);
    }

    input.addEventListener('input', () => {
        input.classList.remove('product-form__input_invalid');

        if (input.placeholder === 'Дата') {
            if (!input.value.includes('/')) {
                if (input.value.length === 2) input.value += '/';
            } else {
                if (input.value.length === 3) {
                    input.value = input.value[0];
                }
            }
        }
        if (input.placeholder === 'Номер карты') {
            const img = document.querySelector('.form-img') as HTMLImageElement;
            if (input.value[0] === '3') {
                img.src =
                    'https://www.aexp-static.com/cdaas/one/statics/axp-static-assets/1.8.0/package/dist/img/logos/dls-logo-stack.svg';
            } else if (input.value[0] === '4') {
                img.src = 'https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png';
            } else if (input.value[0] === '5') {
                img.src = 'https://www.mastercard.hu/content/dam/public/mastercardcom/eu/hu/images/mc-logo-52.svg';
            } else {
                img.src =
                    'https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71';
            }
        }
    });

    return [input, validateInput];
}

function isNameValid(value: string): boolean {
    const words = value.split(/\s/);
    const isCorrectLength = words.every((word) => word.length >= 3);

    return words.length >= 2 && isCorrectLength;
}

function isTelValid(value: string): boolean {
    return /^\+[0-9]{9,}$/.test(value);
}

function isAddressValid(value: string): boolean {
    const words = value.split(/\s/).filter((word) => word.length >= 5);

    return words.length >= 3;
}

function isEmailValid(value: string): boolean {
    return /^[a-z0-9]*@[a-z0-9]*\.[a-z]{2,}$/i.test(value);
}

function isCardNumValid(value: string): boolean {
    return /^[0-9]{16}$/.test(value);
}

function isCardDateValid(value: string): boolean {
    if (value.length !== 5) {
        return false;
    }

    if (!/^[0-9]{2}\/[0-9]{2}$/.test(value)) {
        return false;
    }

    const date = value.split('/');

    if (date.length !== 2) {
        return false;
    }

    const month = Number(date[0]);

    return month <= 12;
}

function isCvvValid(value: string): boolean {
    return /^[0-9]{3}$/.test(value);
}

const inputsParamsDetails: CreateInputParams[] = [
    { className: 'name-input', type: 'text', placeholder: 'Имя Фамилия', validate: isNameValid },
    { className: 'tel-input', type: 'tel', placeholder: 'Телефон', validate: isTelValid },
    { className: 'address-input', type: 'text', placeholder: 'Адрес доставки', validate: isAddressValid },
    { className: 'email-input', type: 'email', placeholder: 'Электронная почта', validate: isEmailValid },
];

const inputsParamsCard: CreateInputParams[] = [
    { className: 'card-number-input', type: 'number', placeholder: 'Номер карты', validate: isCardNumValid },
    { className: 'card-date-input', type: 'text', placeholder: 'Дата', validate: isCardDateValid },
    { className: 'card-code-input', type: 'number', placeholder: 'CVV', validate: isCvvValid },
];

class Buy {
    private wrapper: HTMLFormElement;
    private overlay: HTMLDivElement;
    private details: HTMLDivElement;
    private cardInfo: HTMLDivElement;
    private validateFunctions: Array<() => boolean>;

    constructor() {
        this.wrapper = document.createElement('form');
        this.overlay = document.createElement('div');
        this.details = document.createElement('div');
        this.cardInfo = document.createElement('div');
        this.validateFunctions = [];
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

        inputsParamsDetails.map((params) => {
            const [input, validate] = createInput(params);
            content.append(input);
            this.validateFunctions.push(validate);
        });

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

        inputsParamsCard.map((params) => {
            const [input, validate] = createInput(params);
            content.append(input);
            this.validateFunctions.push(validate);
        });

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

        confirmBtn.addEventListener('click', () => {
            this.validateFunctions.map((validate) => {
                validate();
                if (validate() !== true) {
                    console.log('error');
                    return;
                } else if (this.validateFunctions.every((item) => item() === true)) {
                    const form = document.querySelector('.product-form') as HTMLFormElement;
                    form.innerHTML = `<div class = 'form-send'> Спасибо за заказ!</div>`;
                    form.classList.add('product-form_sended');
                    setTimeout(() => {
                        location.reload();
                    }, 4000);
                }
            });
        });

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
