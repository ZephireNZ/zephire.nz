import { Drawer } from "@material/mwc-drawer";
import "@material/mwc-drawer";
import "@material/mwc-top-app-bar-fixed";
import "@material/mwc-icon-button";
import "@material/mwc-button";
import { commonStyles } from './styles';
import { mdiTwitter, mdiGithub, mdiLinkedin } from "@mdi/js";

import {LitElement, html, css} from 'lit';
import {customElement, property, queryAsync} from 'lit/decorators.js';
import { listenMediaQuery, openPage } from "./util";

import "./zeph-page-router";
import { Button } from "@material/mwc-button";

@customElement('zeph-root')
export class ZephRoot extends LitElement {

    @property({ type: Boolean }) public narrow!: boolean;

    @queryAsync("#zeph-drawer")
    private drawer!: Promise<Drawer>;

    constructor() {
        super();
        listenMediaQuery("(max-width: 767px)", (matches) => {
            this.narrow = matches;
            this.drawer.then((d) => d.open = !this.narrow);
        });
    }

    private _expandNav() {
        this.drawer.then((d) => d.open = !d.open);
    }

    private _pageLink(e: MouseEvent) {
        const button = e.target as Button;
        openPage(button.getAttribute("href")!)
    }

    static override styles = [
        commonStyles,
        css`
            :host {
                width: 100%;
            }

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
            
            

            @media(min-width: 768px) {
                    mwc-drawer[open] mwc-top-app-bar-fixed {
                    /* Default width of drawer is 256px. See CSS Custom Properties below */
                    --mdc-top-app-bar-width: calc(100% - var(--mdc-drawer-width, 256px));
                }
            }

            #sidebar-items a {
                color: inherit;
                text-decoration: inherit;
            }

            #sidebar-items a:hover, #sidebar-items mwc-button:hover {
                color: inherit;
                text-decoration: inherit;
            }

            mwc-top-app-bar-fixed mwc-button {
                --mdc-theme-primary: --mdc-theme-on-primary;
            }


        `
    ];


    override render() {
        return html`
        <mwc-drawer hasHeader type=${this.narrow ? "modal" : ""} id="zeph-drawer">
            <div slot="title">
                <div id="portrait">
                    <img src="/assets/img/portrait-small.png" alt="Portrait" />
                </div>
                <div style="text-align: center">Brynley McDonald</div>
            </div>
            <span slot="subtitle"></span>
            <div id="sidebar-items">
                ${this.narrow ? html`
                <a href="/" target="_self" >
                    <mwc-button
                        raised
                        icon="home"
                        slot="actionItems"
                        label="Home"
                        style="width: 100%"
                        @click=${this._expandNav}>
                    </mwc-button>
                </a>
                <a href="/posts" target="_self">
                    <mwc-button
                        raised
                        icon="inventory"
                        slot="actionItems"
                        label="Post Archive"
                        style="width: 100%"
                        @click=${this._expandNav}>
                    </mwc-button>
                </a>
                ` : ""}
                <a href="mailto:brynley+site@zephire.nz" target="_blank">
                    <mwc-button
                    raised
                    label="Email me"
                    icon="email"
                    style="width: 100%"
                    >
                    </mwc-button>
                </a>
                <div id="sidebar-links">
                    <a href="https://github.com/ZephireNZ" target="_blank">
                        <mwc-icon-button aria-label="Github">
                            <svg>
                                <path d=${mdiGithub} />
                            </svg>
                        </mwc-icon-button>
                    </a>
                    <a href="https://twitter.com/ZephireNZ" target="_blank">
                        <mwc-icon-button aria-label="Twitter">
                            <svg>
                                <path d=${mdiTwitter} />
                            </svg>
                        </mwc-icon-button>
                    </a>
                    <a href="https://www.linkedin.com/in/brynley-mcdonald-413191112/" target="_blank">
                        <mwc-icon-button aria-label="LinkedIn">
                            <svg>
                                <path d=${mdiLinkedin} />
                            </svg>
                        </mwc-icon-button>
                    </a>
                </div>
            </div>

            <div slot="appContent">
                <mwc-top-app-bar-fixed>
                    ${this.narrow 
                        ? html`
                            <mwc-icon-button
                                icon="menu"
                                slot="navigationIcon"
                                @click=${this._expandNav}
                            >
                            </mwc-icon-button>
                        ` : ""}
                    <div slot="title">Zeph's Blog</div>
                    ${this.narrow 
                        ? html``
                        : html`
                            <mwc-button
                                icon="home"
                                slot="actionItems"
                                label="Home"
                                href="/"
                                @click=${this._pageLink}>
                            </mwc-button>
                            <mwc-button
                                icon="inventory"
                                slot="actionItems"
                                label="Post Archive"
                                href="/posts"
                                @click=${this._pageLink}>
                            </mwc-button>
                        `}

                    <!-- Content -->
                    <zeph-page-router>

                    </zeph-page-router>
                </mwc-top-app-bar-fixed>
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