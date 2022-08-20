import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import commonStyles from "../styles/common.scss";

import cardStyles from "../styles/mdc-card.scss";

@customElement('zeph-skills-card')
export class ZephSkillsCard extends LitElement {


    static override styles = [
        commonStyles,
        cardStyles
    ]

    override render() {
        return html`
            <div class="mdc-card">
                <div class="mdc-layout-grid">
                    <div class="mdc-layout-grid__inner">
                        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-1 mdc-layout-grid__cell--span-4-phone card-image">
                            <slot name="image"></slot>
                        </div>
                        <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-11-desktop mdc-layout-grid__cell--span-7-tablet mdc-layout-grid__cell--span-4-phone">
                            <slot></slot>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'zeph-skills-card': ZephSkillsCard;
    }
}