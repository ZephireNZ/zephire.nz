import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import commonStyles from "./styles/common.scss";

@customElement('zeph-404')
export class Zeph404 extends LitElement {


    static override styles = [
        commonStyles
    ]

    override render() {
        return html`
            <h1>404</h1>

            <p>Hmmm, something went wrong.</p>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'zeph-404': Zeph404;
    }
}