import { marked } from 'marked';
import * as _matter from 'gray-matter';

marked.setOptions({
   gfm: true,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const matter = (_matter as any).default || _matter;

/**
* Attach a media query. Listener is called right away and when it matches.
* @param mediaQuery media query to match.
* @param listener listener to call when media query changes between match/unmatch
* @returns function to remove the listener.
*/
export const listenMediaQuery = (
   mediaQuery: string,
   matchesChanged: (matches: boolean) => void
) => {
   const mql = matchMedia(mediaQuery);
   const listener = (e) => matchesChanged(e.matches);
   mql.addListener(listener);
   matchesChanged(mql.matches);
   return () => mql.removeListener(listener);
};

export const convertMarkdown  = (src: string) => {
   return marked.parse(src);
}

export interface BlogPostData {
   html: string,
   metadata: object,
   filename: string
}