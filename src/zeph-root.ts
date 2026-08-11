import { commonStyles } from "./styles";
import { mdiGithub, mdiLinkedin } from "@mdi/js";
import BlueskySvg from "@/assets/icon/bluesky.svg?raw";
import {LitElement, html, css} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {classMap} from 'lit/directives/class-map.js';
import { listenMediaQuery, openPage } from "./util";
import "./zeph-page-router";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";

import "@material/web/button/filled-button.js";
import "@material/web/button/text-button.js";
import "@material/web/icon/icon.js";
import "@material/web/iconbutton/icon-button.js";

@customElement('zeph-root')
export class ZephRoot extends LitElement {

    @property({ type: Boolean }) public narrow!: boolean;

    @state()
    private drawerOpen = true;

    constructor() {
        super();
        listenMediaQuery("(max-width: 767px)", (matches) => {
            this.narrow = matches;
            this.drawerOpen = !this.narrow;
        });
    }

    private _expandNav() {
        this.drawerOpen = !this.drawerOpen;
    }

    private _pageLink(e: MouseEvent) {
        const button = e.currentTarget as HTMLElement;
        openPage(button.dataset.href!)
    }

    static override styles = [
        commonStyles,
        css`
            :host {
                width: 100%;
            }

            .zeph-layout {
                display: flex;
                min-height: 100vh;
            }

            #title {
                text-align: center;
                color: var(--zeph-primary);
            }

            #subtitle {
                text-align: center;
                font-style: italic;
                color: rgba(0, 0, 0, 0.6);
            }

            #portrait {
                max-width: 100%;
                padding-left: 16px;
                padding-right: 16px;
                padding-bottom: 16px;
            }
            #portrait img {
                border-radius: 50%;
                width: 100%;

            }

            .zeph-drawer {
                width: 256px;
                flex-shrink: 0;
                box-sizing: border-box;
                background: #fff;
                display: flex;
                flex-direction: column;
            }

            .zeph-drawer > * {
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

            #sidebar-items a {
                color: inherit;
                text-decoration: inherit;
            }

            #sidebar-items a:hover, #sidebar-items md-filled-button:hover {
                color: inherit;
                text-decoration: inherit;
            }

            .zeph-app-content {
                flex: 1;
                min-width: 0;
                display: flex;
                flex-direction: column;
            }

            .zeph-top-app-bar {
                position: sticky;
                top: 0;
                z-index: 5;
                display: flex;
                align-items: center;
                gap: 8px;
                height: 64px;
                padding: 0 16px;
                box-sizing: border-box;
                background: var(--zeph-primary);
                color: var(--zeph-on-primary);
            }

            .zeph-top-app-bar #app-title {
                flex: 1;
                font-size: 1.25rem;
            }

            .zeph-top-app-bar md-text-button {
                --md-text-button-label-text-color: var(--zeph-on-primary);
                --md-text-button-icon-color: var(--zeph-on-primary);
                --md-text-button-hover-label-text-color: var(--zeph-on-primary);
                --md-text-button-hover-icon-color: var(--zeph-on-primary);
                --md-text-button-focus-label-text-color: var(--zeph-on-primary);
                --md-text-button-focus-icon-color: var(--zeph-on-primary);
                --md-text-button-pressed-label-text-color: var(--zeph-on-primary);
                --md-text-button-pressed-icon-color: var(--zeph-on-primary);
                --md-text-button-hover-state-layer-color: var(--zeph-on-primary);
                --md-text-button-pressed-state-layer-color: var(--zeph-on-primary);
            }

            .zeph-top-app-bar md-icon-button {
                --md-icon-button-icon-color: var(--zeph-on-primary);
                --md-icon-button-hover-icon-color: var(--zeph-on-primary);
                --md-icon-button-focus-icon-color: var(--zeph-on-primary);
                --md-icon-button-pressed-icon-color: var(--zeph-on-primary);
                --md-icon-button-hover-state-layer-color: var(--zeph-on-primary);
                --md-icon-button-pressed-state-layer-color: var(--zeph-on-primary);
            }

            .zeph-content {
                flex: 1;
            }

            .scrim {
                position: fixed;
                inset: 0;
                background: rgba(0, 0, 0, 0.32);
                z-index: 9;
            }

            @media(max-width: 767px) {
                .zeph-drawer {
                    position: fixed;
                    inset: 0 auto 0 0;
                    z-index: 10;
                    transform: translateX(-100%);
                    transition: transform 0.2s ease-in-out;
                    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.3);
                }

                .zeph-drawer.open {
                    transform: translateX(0);
                }
            }
        `
    ];


    override render() {
        return html`
        <div class="zeph-layout">
            <aside class="zeph-drawer ${classMap({open: this.drawerOpen})}" id="zeph-drawer">
                <div id="portrait">
                    <img src="/assets/img/portrait-small.png" alt="Portrait" />
                </div>
                <h3 id="title" style="text-align: center" class="mdc-typography--headline5">Brynley McDonald</h3>
                <h6 id="subtitle" class="mdc-typography--subtitle2">
                    Developer and Tech Enthusiast <br>
                    based in Auckland, New Zealand
                </h6>
                <div id="sidebar-items">
                    ${this.narrow ? html`
                    <a href="/" target="_self" >
                        <md-filled-button
                            style="width: 100%"
                            @click=${this._expandNav}>
                            <md-icon slot="icon">home</md-icon>
                            Home
                        </md-filled-button>
                    </a>
                    <a href="/posts" target="_self">
                        <md-filled-button
                            style="width: 100%"
                            @click=${this._expandNav}>
                            <md-icon slot="icon">inventory</md-icon>
                            Post Archive
                        </md-filled-button>
                    </a>
                    ` : ""}
                    <a href="mailto:brynley+site@zephire.nz" target="_blank">
                        <md-filled-button
                        style="width: 100%"
                        >
                            <md-icon slot="icon">email</md-icon>
                            Email me
                        </md-filled-button>
                    </a>
                    <div id="sidebar-links">
                        <a href="https://github.com/ZephireNZ" target="_blank">
                            <md-icon-button aria-label="Github">
                                <svg>
                                    <path d=${mdiGithub} />
                                </svg>
                            </md-icon-button>
                        </a>
                        <a href="https://bsky.app/profile/zephire.nz" target="_blank">
                            <md-icon-button aria-label="BlueSky">
                                ${unsafeSVG(BlueskySvg)}
                            </md-icon-button>
                        </a>
                        <a href="https://www.linkedin.com/in/brynley-mcdonald-413191112/" target="_blank">
                            <md-icon-button aria-label="LinkedIn">
                                <svg>
                                    <path d=${mdiLinkedin} />
                                </svg>
                            </md-icon-button>
                        </a>
                    </div>
                </div>
            </aside>

            ${this.narrow && this.drawerOpen ? html`<div class="scrim" @click=${this._expandNav}></div>` : ""}

            <div class="zeph-app-content">
                <div class="zeph-top-app-bar">
                    ${this.narrow
                        ? html`
                            <md-icon-button
                                aria-label="Menu"
                                @click=${this._expandNav}
                            >
                                <md-icon>menu</md-icon>
                            </md-icon-button>
                        ` : ""}
                    <div id="app-title">Zeph's Blog</div>
                    ${this.narrow
                        ? html``
                        : html`
                            <md-text-button data-href="/" @click=${this._pageLink}>
                                <md-icon slot="icon">home</md-icon>
                                Home
                            </md-text-button>
                            <md-text-button data-href="/posts" @click=${this._pageLink}>
                                <md-icon slot="icon">inventory</md-icon>
                                Post Archive
                            </md-text-button>
                        `}
                </div>

                <div class="zeph-content">
                    <!-- Content -->
                    <zeph-page-router>

                    </zeph-page-router>
                </div>
            </div>
        </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'zeph-root': ZephRoot;
    }
}
