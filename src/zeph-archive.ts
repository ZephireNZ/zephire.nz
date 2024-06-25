import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { commonStyles } from "./styles";
import { until } from 'lit-html/directives/until.js';
import { openPage, PostMeta } from './util';

import "@material/mwc-list/mwc-list";
import "@material/mwc-list/mwc-list-item";
import "@material/mwc-icon";

@customElement('zeph-archive')
export class ZephArchive extends LitElement {

    static override styles = [
        commonStyles
    ]

    private _openPost(e: Event) {
        const post = e.target as LitElement;
        
        const href = post.getAttribute("data-post")!;

        openPage(href)
    }

    override render() {
        const post_map = fetch(`/posts/post-map.json`)
                            .then(p => p.json())
                            .then((posts: PostMeta[]) => posts.map((p: PostMeta, i, {length}) => {
                                    return html`
                                        <mwc-list-item
                                            twoline
                                            graphic="large"
                                            data-post=${`/posts/${p.year}/${p.month}/${p.day}/${p.name}`}
                                            @request-selected=${this._openPost}
                                        >
                                            <mwc-icon slot="graphic">article</mwc-icon>
                                            <span>${p.title}</span>
                                            <span slot="secondary">${p.excerpt}</span> 
                                        </mwc-list-item>
                                        ${length - 1 != i ? html`<li divider role="separator" padded></li>` : ""}
                                    `
                                })
                            )

        return html`
            <mwc-list>
                ${until(post_map, html`<span>Loading...</span>`)}
            </mwc-list>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'zeph-archive': ZephArchive;
    }
}