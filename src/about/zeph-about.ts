import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { commonStyles } from "../styles";
import "@material/mwc-icon";
import { mdiDotNet, mdiPoll, mdiSitemap, mdiVuejs } from '@mdi/js';

import "./zeph-skills-card";
import "../mdi-icon";

@customElement('zeph-about')
export class ZephAbout extends LitElement {


    static override styles = [
        commonStyles,
        css`
            :host {
                --mdc-icon-size: 96px;
            }

            mdi-icon {
                width: var(--mdc-icon-size);
                height: var(--mdc-icon-size);
                fill: var(--zeph-primary);
            }
        `
    ]

    override render() {
        return html`
            <zeph-skills-card>
                <mdi-icon slot="image" .path=${mdiSitemap}></mdi-icon>

                <h5>Technical Leadership</h5>
                <ul>
                    <li>Agile Architect, a role equivalent to a Senior/Staff Engineer</li>
                    <li>Technically planning and architecting solutions ahead of implementation</li>
                    <li>Working closely with development teams and Product Owners to deliver on that plan</li>
                </ul>
            </zeph-skills-card>
            <zeph-skills-card>
                <mdi-icon slot="image" .path=${mdiVuejs}></mdi-icon>

                <h5>Frontend Development</h5>
                <ul>
                    <li>Highly skilled in building Vue applications using TypeScript</li>
                    <li>Client-side rendering and modern, component-driven architecture</li>
                    <li>Experienced across the broader frontend ecosystem including JavaScript</li>
                </ul>
            </zeph-skills-card>
            <zeph-skills-card>
                <mdi-icon slot="image" .path=${mdiDotNet}></mdi-icon>

                <h5>Backend Development</h5>
                <ul>
                    <li>Highly skilled in ASP.NET microservices</li>
                    <li>Database design and ORM, including Entity Framework</li>
                    <li>Full stack including asynchronous applications</li>
                    <li>Experienced in multiple languages including Python, Java, and C#</li>
                </ul>
            </zeph-skills-card>
            <zeph-skills-card>
                <mdi-icon slot="image" .path=${mdiPoll}></mdi-icon>
                
                <h5>Data Analytics</h5>
                <ul>
                    <li>Create visual reports with tools like Splunk, Business Objects, Tableau and advanced Excel</li>
                    <li>Exploring data sources and creating actionable insights</li>
                    <li>Identifying inefficiencies and translating this into cost savings</li>
                </ul>
            </zeph-skills-card>
        `
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'zeph-about': ZephAbout;
    }
}