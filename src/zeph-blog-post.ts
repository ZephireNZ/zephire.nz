import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {until} from 'lit-html/directives/until.js';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';


import commonStyles from "./styles/common.scss";
import { convertMarkdown, awaitElement } from './util';
import { RouterLocation } from '@vaadin/router';

import matter from 'gray-matter';


interface PostParams {
    year: string,
    month: string,
    day: string,
    name: string
}

@customElement('zeph-blog-post')
export class ZephBlogPost extends LitElement {

    @property({ attribute: false})
    public location!: RouterLocation;

    static override styles = [
        commonStyles,
        css`
        
            a, div, p, span, h1, h2, h3, h4, h5, h6, h7, h9 {
                scroll-margin-top: 64px;
            }
        `
    ]

    constructor() {
        super();
    }

    override connectedCallback() {
        super.connectedCallback();

        awaitElement(this.renderRoot, "post-content").then((p) => {
            if(window.location.hash) {
                p.querySelector(`${window.location.hash}`)?.scrollIntoView();
            }

            const links = this.renderRoot.querySelectorAll('a[href^="#"')

            links.forEach((el) => {
                const anchor = el as HTMLAnchorElement;
                anchor.onclick = (e) => {
                    e.preventDefault();
                    history.pushState(null, "", anchor.getAttribute("href"));
                    p.querySelector(`${anchor.getAttribute("href")}`)?.scrollIntoView();
                }
            })
        })
    }

    override render() {
        const params: PostParams = this.location.params as unknown as PostParams;
        const postName = `${params.year}-${params.month}-${params.day}-${params.name}`
        
        const post_meta = fetch(`/posts/${postName}.md`)
                            .then(p => p.text())
                            .then(p => matter(p))

        const post_html = post_meta.then(p => {
            return html`
                <h2>${p.data.title}</h2>
                <p class="mdc-typography--subtitle1">${params.year}-${params.month}-${params.day}</p>
                <hr />
                <div id="post-content">
                    ${unsafeHTML(convertMarkdown(p.content))}
                </div>
            `
        })

        return html`${until(post_html, html`<span>Loading...</span>`)}`;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'zeph-blog-post': ZephBlogPost;
    }
}