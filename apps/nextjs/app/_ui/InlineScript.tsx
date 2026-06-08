// Renders an inline script that runs during HTML parsing (before paint) on hard loads.
// Server-rendered as executable JS; on the client it becomes inert `text/plain` so React
// doesn't warn about script tags. See node_modules/next docs: preventing-flash-before-hydration.
// SECURITY: `html` must always be a trusted compile-time constant, never user- or
// runtime-derived data — it is injected verbatim into the page.
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === 'undefined' ? 'text/javascript' : 'text/plain'}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
