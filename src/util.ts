import * as _matter from 'gray-matter';
import MarkdownIt from 'markdown-it';
import * as markdownItAttrs from '@gerhobbelt/markdown-it-attrs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const matter = (_matter as any).default || _matter;

const md = MarkdownIt({
   html: true,
});

md.use(markdownItAttrs.default);

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
   return md.render(src);
}

export const openPage = (href: string) => {
   history.pushState(null, '', href)
   window.dispatchEvent(new PopStateEvent('popstate')); // Required by vaadin-router
}

export interface BlogPostData {
   html: string,
   metadata: object,
   filename: string
}

export interface PostMeta {
   year: string,
   month: string,
   day: string,
   name: string,
   excerpt: string,
   title: string
}