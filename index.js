
const eye_open  = `<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path d="M12,7c-2.48,0-4.5,2.02-4.5,4.5S9.52,16,12,16s4.5-2.02,4.5-4.5S14.48,7,12,7z M12,14.2c-1.49,0-2.7-1.21-2.7-2.7 c0-1.49,1.21-2.7,2.7-2.7s2.7,1.21,2.7,2.7C14.7,12.99,13.49,14.2,12,14.2z"></path><path d="M12,4C7,4,2.73,7.11,1,11.5C2.73,15.89,7,19,12,19s9.27-3.11,11-7.5C21.27,7.11,17,4,12,4z M12,17 c-3.79,0-7.17-2.13-8.82-5.5C4.83,8.13,8.21,6,12,6s7.17,2.13,8.82,5.5C19.17,14.87,15.79,17,12,17z"></path><path fill="none" d="M0,0h24v24H0V0z"></path></svg>`;
const eye_close = `<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" focusable="false"><path d="M10.58,7.25l1.56,1.56c1.38,0.07,2.47,1.17,2.54,2.54l1.56,1.56C16.4,12.47,16.5,12,16.5,11.5C16.5,9.02,14.48,7,12,7 C11.5,7,11.03,7.1,10.58,7.25z"></path><path d="M12,6c3.79,0,7.17,2.13,8.82,5.5c-0.64,1.32-1.56,2.44-2.66,3.33l1.42,1.42c1.51-1.26,2.7-2.89,3.43-4.74 C21.27,7.11,17,4,12,4c-1.4,0-2.73,0.25-3.98,0.7L9.63,6.3C10.4,6.12,11.19,6,12,6z"></path><path d="M16.43,15.93l-1.25-1.25l-1.27-1.27l-3.82-3.82L8.82,8.32L7.57,7.07L6.09,5.59L3.31,2.81L1.89,4.22l2.53,2.53 C2.92,8.02,1.73,9.64,1,11.5C2.73,15.89,7,19,12,19c1.4,0,2.73-0.25,3.98-0.7l4.3,4.3l1.41-1.41l-3.78-3.78L16.43,15.93z M11.86,14.19c-1.38-0.07-2.47-1.17-2.54-2.54L11.86,14.19z M12,17c-3.79,0-7.17-2.13-8.82-5.5c0.64-1.32,1.56-2.44,2.66-3.33 l1.91,1.91C7.6,10.53,7.5,11,7.5,11.5c0,2.48,2.02,4.5,4.5,4.5c0.5,0,0.97-0.1,1.42-0.25l0.95,0.95C13.6,16.88,12.81,17,12,17z"></path></svg>`;

const div = document.createElement('template');
div.innerHTML = `
    <style>
        .ce_password-toggle { display: inherit; }
        button { border: 0; cursor: pointer; background: transparent; vertical-align: middle; }
    </style>
    <div class="ce_password-toggle">
    <button toggle>Show / Hide</button>
    </div>
`;

class PasswordToggle extends HTMLElement {
    constructor()
    {
        super();

        this.inputs = [];
        this.shown = false;
        
        this.hasAttribute('input') || this.setAttribute('input', 'password');

        this.toggle = this.toggle.bind(this);
    }

    connectedCallback()
    {
        this.input.forEach((name, key) => { 
            let el = document.querySelector('input[name='+name+']');
            if (el !== null) {
                this.inputs[key] = el;
            } else {
                console.error(`Password input attribute "${name}" name does not exist on this page.`);
            }
        });

        if (this.resolutionMin !== undefined && this.isBlocked(this.resolutionMin)) {
            return false;
        }

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(div.content.cloneNode(true));

        this.toggleBtn = this.shadowRoot.querySelector('[toggle]');
        this.toggleBtn.innerHTML = eye_close;
        this.toggleBtn.addEventListener('click', this.toggle);
    }

    disconnectedCallback()
    {
        if (this.toggleBtn) {
            this.toggleBtn.removeEventListener('click', this.toggle);
        }
    }

    static get observedAttributes()
    {
        return ['input', 'resolution-min'];
    }

    get input()
    {
        return this.getAttribute('input').split(",");
    }

    get resolutionMin()
    {
        return parseInt(this.getAttribute('resolution-min'), 10) || undefined;
    }

    /**
     * Change the input linked to custom element.
     * @param {string} value
     */
    set input(value)
    {
        this.setAttribute('input', value);
    }

    /**
     * Toogle icon and input type.
     */
    toggle()
    {
        this.shown = !this.shown;
        let type = (this.shown) ? 'text' : 'password';
        this.toggleBtn.innerHTML = (this.shown) ? eye_open : eye_close;
        this.inputs.forEach(el => {
            el.setAttribute('type', type);
        });
    }

    /**
     * Check if resolution is higher than attribute passed by user.
     * @param {number} min Resolution minimal for render the custom element.
     * @returns {boolean}
     */
    isBlocked(min)
    {
        return Math.max(document.documentElement.clientWidth, window.innerWidth || 0) <= min;
    }
}

customElements.define('password-toggle', PasswordToggle);