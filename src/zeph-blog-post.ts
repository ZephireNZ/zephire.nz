import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {until} from 'lit-html/directives/until.js';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';


import { commonStyles } from './styles';
import { convertMarkdown } from './util';
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
    ]

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
                ${unsafeHTML(convertMarkdown(p.content))}
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