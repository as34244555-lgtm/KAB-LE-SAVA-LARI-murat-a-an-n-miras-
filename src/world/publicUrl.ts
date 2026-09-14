/** Vite `base` so assets resolve on GitHub Pages and other subpaths. */
export function publicUrl(path: string): string {
  const base = import.meta.env.BASE_URL ?? "./";
  return `${base}${path.replace(/^\//, "")}`;
}
