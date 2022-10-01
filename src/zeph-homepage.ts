import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "./about/zeph-about";

@customElement('zeph-homepage')
export class ZephHomepage extends LitElement {


    override render() {
        return html`
            <zeph-about></zeph-about>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'zeph-homepage': ZephHomepage;
    }
}