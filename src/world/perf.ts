export function isMobileClient(): boolean {
  if (typeof navigator === "undefined") return false;
  const coarse = typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)").matches;
  return coarse || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) || window.innerWidth < 900;
}

/** Retina ve 4K ekranlar tam piksel oranında çizilince GPU ısınıp sekme kapanıyordu. */
export function pixelCap(): number {
  const dpr = typeof window === "undefined" ? 1 : window.devicePixelRatio || 1;
  return Math.min(dpr, isMobileClient() ? 1 : 1.1);
}

/** Strateji oyunu 30 karede akıcı kalır; 60 kare cihazı fırın gibi ısıtıyordu. */
export function targetFrameMs(): number {
  return 1000 / 30;
}
