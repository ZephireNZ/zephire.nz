import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { commonStyles } from "../styles";
import "@material/mwc-icon";
import { mdiKubernetes, mdiMonitor, mdiPoll, mdiServer, mdiSitemap } from '@mdi/js';

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
                    <li>Currently working as an Agile Architect, a role that sits at the Senior/Staff Engineer level</li>
                    <li>Technically planning and architecting solutions ahead of implementation</li>
                    <li>Working closely with development teams and product owners to bring that plan to life</li>
                </ul>
            </zeph-skills-card>
            <zeph-skills-card>
                <mdi-icon slot="image" .path=${mdiKubernetes}></mdi-icon>

                <h5>Kubernetes</h5>
                <ul>
                    <li>CKAD certified</li>
                    <li>Highly skilled at building scalable applications in k8s using k8s-native functionality</li>
                    <li>Built out a production cluster running over 100 API microservices as well as stateful background workers</li>
                </ul>
            </zeph-skills-card>
            <zeph-skills-card>
                <mdi-icon slot="image" .path=${mdiMonitor}></mdi-icon>

                <h5>Frontend Development</h5>
                <ul>
                    <li>Highly skilled in building Vue applications using TypeScript</li>
                    <li>Client-side rendering and modern, component-driven architecture</li>
                </ul>
            </zeph-skills-card>
            <zeph-skills-card>
                <mdi-icon slot="image" .path=${mdiServer}></mdi-icon>

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