(function() {
    const div = document.createElement('template');

    div.innerHTML = `
        <style>
            .ce_show-hide {
                display: inherit;
            }
            button {
                border: 0;
                padding: 0;
                text-indent: -3000px;
                cursor: pointer;
                width: 24px;
                height: 24px;
                background: url('icons/eye-close.svg') center center / 100% 100%;
            }
            button.visible {
                width: 24px;
                height: 24px;
                background: url('icons/eye-open.svg') center center / 100% 100%;
            }
        </style>
        <div class="ce_show-hide">
        <button toggle>Show / Hide</button>
        </div>
    `;

    class PasswordToggle extends HTMLElement {
        constructor() {
            super();

            this.shown = false;
            this.inputs = document.querySelectorAll('input[type=password]');

            this.toggle = this.toggle.bind(this);
            this.render = (this.resolutionMin !== undefined) ? this.isblocked(this.resolutionMin) : true;

            if (this.render) {
                this.attachShadow({mode: 'open'});
                this.shadowRoot.appendChild(div.content.cloneNode(true));

                this.toggleBtn = this.shadowRoot.querySelector('[toggle]');
            }
        }

        connectedCallback() {
            if (this.toggleBtn) {
                this.toggleBtn.addEventListener('click', this.toggle);
            }
        }

        disconnectedCallback() {
            if (this.toggleBtn) {
                this.toggleBtn.removeEventListener('click', this.toggle);
            }
        }

        static get observedAttributes() {
            return ['input', 'resolution-min'];
        }

        get input() {
            return this.getAttribute('input').split(",");
        }

        get resolutionMin() {
            return this.getAttribute('resolution-min');
        }

        toggle() {
            this.shown = !this.shown;
            let type = (this.shown) ? 'text' : 'password';
            this.toggleBtn.classList.toggle('visible');
            this.input.some(el => {
                Array.from(this.inputs)
                    .filter(n => n.getAttribute('name').includes(el))
                    .map(n => n.setAttribute('type', type));
            });
        }

        isblocked(min) {
           return (window.screen.width >= min);
        }
    }

    customElements.define('password-toggle', PasswordToggle)
})();
