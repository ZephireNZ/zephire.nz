import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import {until} from 'lit-html/directives/until.js';
import {unsafeHTML} from 'lit-html/directives/unsafe-html.js';


import { commonStyles } from './styles';
import { convertMarkdown, matter } from './util';
import { RouterLocation } from '@vaadin/router';


interface PostParams {
    year: string,
    month: string,
    day: string,
    name: string
}

@customElement('zeph-blog-post')
export class ZephBlogPost extends LitElement {

    @property() public postName?: string;

    @property({ attribute: false})
    public location?: RouterLocation;

    static override styles = [
        commonStyles,
        css`
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

    override render() {
        if (this.location) {
            const params: PostParams = this.location.params as unknown as PostParams;
            this.postName = `${params.year}-${params.month}-${params.day}-${params.name}`
        }
        
        const post_meta = fetch(`/posts/${this.postName}.md`)
                            .then(p => p.text())
                            .then(p => matter(p))

        const post_html = post_meta.then(p => convertMarkdown(p.content))

        return html`
            <div id="container">
                ${until(post_html.then(unsafeHTML), html`<span>Loading...</span>`)}
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'zeph-blog-post': ZephBlogPost;
    }
}