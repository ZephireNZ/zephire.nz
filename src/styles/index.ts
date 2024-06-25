import { unsafeCSS } from "lit";
import commonCss from './common.scss?inline'
import mdcCardCss from './mdc-card.scss?inline'

export const commonStyles = unsafeCSS(commonCss)
export const mdcCard = unsafeCSS(mdcCardCss)