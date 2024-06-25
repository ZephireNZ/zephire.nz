import { css, html, LitElement } from "lit";
import { customElement, queryAsync } from "lit/decorators.js";

import { Router } from "@vaadin/router";

@customElement('zeph-page-router')
export class ZephPageRouter extends LitElement {

    @queryAsync("div#content")
    private content!: Promise<Node>;

    static override styles = [
        css`
            #content {
                margin: 1em;
            }
            
            div#container {
                margin-left: auto;
                margin-right: auto;
                max-width: 100%;
            }

            @media (min-width: 576px) {
                div#container {
                    max-width: 540px;
                }
            }

            @media (min-width: 768px) {
                div#container {
                    max-width: 720px;
                }
            }

            @media (min-width: 992px) {
                div#container {
                    max-width: 960px;
                }
            }

            @media (min-width: 1200px) {
                div#container {
                    max-width: 1140px;
                }
            }
        `
    ]

    constructor() {
        super();
        this.content.then(c => {
            const router = new Router(c);

            router.setRoutes([
                {
                    path: '/',
                    action: async () => { import('./zeph-homepage') },
                    component: 'zeph-homepage'
                },
                {
                    path: '/posts/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:name',
                    action: async () => { import('./zeph-blog-post') },
                    component: 'zeph-blog-post'
                },
                {
                    path: '/posts',
                    action: async () => { import('./zeph-archive') },
                    component: 'zeph-archive'
                },
                {
                    path: '/about',
                    action: async () => { import('./about/zeph-about') },
                    component: 'zeph-about'
                },
                {
                    path: '(.*)',
                    action: async () => { import('./zeph-404') },
                    component: 'zeph-404'
                },
            ])
        })
    }

    override render() {
        return html`
            <div id="container">
                <div id="content">
                    
                </div>
            </div>
        `
    }

}

declare global {
    interface HTMLElementTagNameMap {
        'zeph-page-router': ZephPageRouter;
    }
}