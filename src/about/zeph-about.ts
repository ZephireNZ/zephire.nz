import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { commonStyles } from "../styles";
import "@material/mwc-icon";
import { mdiCodeBraces, mdiPoll, mdiRobot } from '@mdi/js';

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
                <mdi-icon slot="image" .path=${mdiCodeBraces}></mdi-icon>

                <h5>Development</h5>
                <ul>
                    <li>Experienced in multiple languages including JavaScript, Python, Java, and C#</li>
                    <li>Full Stack including asynchronous applications and client-side rendering</li>
                </ul>
            </zeph-skills-card>
            <zeph-skills-card>
                <mdi-icon slot="image" .path=${mdiRobot}></mdi-icon>

                <h5>Robotic Process Automation</h5>
                <ul>
                    <li>Creating automations in UiPath to improve operational efficiencies</li>
                    <li>To date, contributed to over a million dollars in time savings and cost avoidance</li>
                    <li>Bringing together attended and unattended automations to create a seamless user experience</li>
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