import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import commonStyles from "../styles/common.scss";

import cardStyles from "../styles/mdc-card.scss";

@customElement('zeph-skills-card')
export class ZephAbout extends LitElement {


    static override styles = [
        commonStyles,
        cardStyles
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