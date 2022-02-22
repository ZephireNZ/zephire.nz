import { css, html, LitElement } from "lit";
import { customElement, queryAsync } from "lit/decorators.js";

import { Router } from "@vaadin/router";

import './zeph-blog-post';
import './zeph-homepage';
import './zeph-404';
import './zeph-archive';

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
                {path: '/', component: 'zeph-homepage'},
                {path: '/posts/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:name', component: 'zeph-blog-post'},
                {path: '/posts', component: 'zeph-archive'},
                {path: '(.*)', component: 'zeph-404'},
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