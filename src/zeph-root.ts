import { Drawer } from "@material/mwc-drawer";
import "@material/mwc-drawer";
import "@material/mwc-top-app-bar-fixed";
import "@material/mwc-icon-button";
import "@material/mwc-button";
import { commonStyles } from './styles';

import {LitElement, html, css} from 'lit';
import {customElement, property, query} from 'lit/decorators.js';
import { listenMediaQuery } from "./util";


@customElement('zeph-root')
export class ZephRoot extends LitElement {

    @property({ type: Boolean }) public narrow!: boolean;

    @query("#zeph-drawer")
    private drawer!: Drawer;

    constructor() {
        super();
        listenMediaQuery("(max-width: 870px)", (matches) => {
            this.narrow = matches;
        });
    }

    private _expandNav() {
        this.drawer.open = !this.drawer.open;
    }

    static override styles = [
        commonStyles,
        css`
            #portrait {
                max-width: 100%;
                /* padding-left: 1em;
                padding-right: 1em; */
            }
            #portrait img {
                border-radius: 50%;
                width: 100%;
                
            }

            div[slot="title"], #sidebar-items {
                display: flex;
                flex-direction: column;

            }

            div[slot="title"] > *, #sidebar-items > * {
                padding-left: 1em;
                padding-right: 1em;
                padding-bottom: 1em;
            }

            #sidebar-links {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
            }

            mwc-drawer[open] mwc-top-app-bar-fixed {
                /* Default width of drawer is 256px. See CSS Custom Properties below */
                --mdc-top-app-bar-width: calc(100% - var(--mdc-drawer-width, 256px));
            }


        `
    ];


    override render() {
        return html`
        <mwc-drawer hasHeader type="dismissible" id="zeph-drawer" open>
            <div slot="title">
                <div id="portrait">
                    <img src="/assets/img/portrait-small.png" />
                </div>
                <div style="text-align: center">Brynley McDonald</div>
            </div>
            <span slot="subtitle"></span>
            <div id="sidebar-items">
                <mwc-button
                    raised
                    label="Email me"
                    icon="email"
                >
                </mwc-button>
                <div id="sidebar-links">
                    <mwc-icon-button icon="file_download" slot="actionItems"></mwc-icon-button>
                    <mwc-icon-button icon="print" slot="actionItems"></mwc-icon-button>
                    <mwc-icon-button icon="favorite" slot="actionItems"></mwc-icon-button>
                </div>
            </div>
            


            <div slot="appContent">
                <mwc-top-app-bar-fixed>
                    <mwc-icon-button icon="menu" slot="navigationIcon" @click=${this._expandNav}></mwc-icon-button>
                    <div slot="title">Title</div>
                    <mwc-icon-button icon="file_download" slot="actionItems"></mwc-icon-button>
                    <mwc-icon-button icon="print" slot="actionItems"></mwc-icon-button>
                    <mwc-icon-button icon="favorite" slot="actionItems"></mwc-icon-button>
                    <div>Here Goes Content!</div>
                </mwc-top-app-bar-fixed>

                <slot name="content"></slot>
            </div>
        </mwc-drawer>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'zeph-root': ZephRoot;
    }
}