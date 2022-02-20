import { css, html, LitElement } from "lit";
import { customElement, queryAsync } from "lit/decorators.js";

import { Router } from "@vaadin/router";

import './zeph-blog-post';
import './zeph-homepage';

@customElement('zeph-page-router')
export class ZephPageRouter extends LitElement {

    @queryAsync("div#content")
    private content!: Promise<Node>;

    static override styles = [
        css`
            #content {
                margin: 1em;
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
            ])
        })
    }

    override render() {
        return html`
            <div id="content">
                
            </div>
        `
    }

}

declare global {
    interface HTMLElementTagNameMap {
        'zeph-page-router': ZephPageRouter;
    }
}