import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import commonStyles from "./styles/common.scss";

@customElement('mdi-icon')
export class MdiIcon extends LitElement {

    static override styles = [
        commonStyles,
        css`
            svg.icon {
                display: block;
                width: 100%;
                height: 100%;
            }
        `
    ]

    @property({attribute: false}) path!: string;

    override render() {
        return html`
            <svg class="icon" viewBox="0 0 24 24">
                <path d=${this.path} />
            </svg>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'mdi-icon': MdiIcon;
    }
}