import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement('zeph-homepage')
export class ZephHomepage extends LitElement {


    override render() {
        return html`
            Welcome!
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'zeph-homepage': ZephHomepage;
    }
}