export function isMobileClient(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 720;
}

export function pixelCap(): number {
  const dpr = typeof window === "undefined" ? 1 : window.devicePixelRatio || 1;
  return isMobileClient() ? Math.min(dpr, 1.15) : Math.min(dpr, 1.4);
}
