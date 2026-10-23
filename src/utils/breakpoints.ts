export const BREAKPOINTS = {
  mobile: '(width < 740px)',
  largeDesktop: '(1600px <= width)',
} as const;

export const isMobile = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia(BREAKPOINTS.mobile).matches;

export const isLargeDesktop = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia(BREAKPOINTS.largeDesktop).matches;

export const isDesktop = (): boolean => !isMobile();

export const onMediaChange = (
  query: string,
  callback: (matches: boolean) => void
): (() => void) => {
  if (typeof window === 'undefined') return () => {};
  const mql = window.matchMedia(query);
  const handler = (event: MediaQueryListEvent) => callback(event.matches);
  mql.addEventListener('change', handler);
  return () => mql.removeEventListener('change', handler);
};
