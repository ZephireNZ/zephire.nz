import { css } from "lit";

export const commonStyles = css`
    :host {
        /* theme */
        --zeph-primary: #a94442;
        --zeph-primary-light: #df736d;
        --zeph-primary-dark: #75131b;
        --zeph-secondary: #795548;
        --zeph-secondary-light: #a98274;
        --zeph-secondary-dark: #4b2c20;

        --zeph-on-primary: #fff;
        --zeph-on-secondary: #fff;
        
        --zeph-background: #e3e3e3;

        /* text */
        --primary-text-color: var(--zeph-on-primary);
        --secondary-text-color: var(--zeph-on-secondary);
        --disabled-text-color: #bdbdbd;

        /* main interface colors */
        --primary-color: var(--zeph-primary);
        --dark-primary-color: var(--zeph-primary-dark);
        --light-primary-color: var(--zeph-primary-light);
        --accent-color: var(--zeph-secondary);
        --divider-color: rgba(0, 0, 0, .12);

        --scrollbar-thumb-color: rgb(194, 194, 194);

        /* mdc */
        --mdc-theme-primary: var(--zeph-primary);
        --mdc-theme-on-primary: var(var(--zeph-on-primary);
    }`