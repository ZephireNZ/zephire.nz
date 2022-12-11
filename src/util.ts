import MarkdownIt from 'markdown-it';
import markdownItAttrs from 'markdown-it-attrs';

const md = MarkdownIt({
   html: true,
});

md.use(markdownItAttrs);

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
   const listener = (e: MediaQueryListEvent) => matchesChanged(e.matches);
   mql.addEventListener("change", listener);
   matchesChanged(mql.matches);
   return () => mql.removeEventListener("change", listener);
};

export function awaitElement(root: Node, id: string) {
   return new Promise<Element>((resolve) => {
      const callback = (mutationList: MutationRecord[]) => {
         mutationList
            .map((m) => m.addedNodes)
            .forEach((nl) => nl.forEach((n) => {
               const element = n as Element;
               if (element.id == id) {
                  resolve(element);
               }
            }))
      };

      const observer = new MutationObserver(callback);
      observer.observe(root, { childList: true, subtree: true });
   });
}

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