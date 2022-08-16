import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import commonStyles from "./styles/common.scss";

@customElement('zeph-about')
export class ZephAbout extends LitElement {


    static override styles = [
        commonStyles
    ]

    override render() {
        return html`
            <mwa-card>

            </mwa-card>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'zeph-about': ZephAbout;
    }
}