import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { commonStyles } from "./styles";
import { until } from 'lit-html/directives/until.js';
import { openPage, PostMeta } from './util';

import "@material/web/list/list.js";
import "@material/web/list/list-item.js";
import "@material/web/icon/icon.js";
import "@material/web/divider/divider.js";

@customElement('zeph-archive')
export class ZephArchive extends LitElement {

    static override styles = [
        commonStyles
    ]

    private _openPost(e: Event) {
        const item = e.currentTarget as HTMLElement;

        const href = item.getAttribute("data-post")!;

        openPage(href)
    }

    override render() {
        const post_map = fetch(`/posts/post-map.json`)
                            .then(p => p.json())
                            .then((posts: PostMeta[]) => posts.map((p: PostMeta, i, {length}) => {
                                    return html`
                                        <md-list-item
                                            type="button"
                                            data-post=${`/posts/${p.year}/${p.month}/${p.day}/${p.name}`}
                                            @click=${this._openPost}
                                        >
                                            <md-icon slot="start">article</md-icon>
                                            <div slot="headline">${p.title}</div>
                                            <div slot="supporting-text">${p.excerpt}</div>
                                        </md-list-item>
                                        ${length - 1 != i ? html`<md-divider></md-divider>` : ""}
                                    `
                                })
                            )

        return html`
            <md-list>
                ${until(post_map, html`<span>Loading...</span>`)}
            </md-list>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'zeph-archive': ZephArchive;
    }
}