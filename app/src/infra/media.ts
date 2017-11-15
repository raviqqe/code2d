const widthQuery = matchMedia("(max-width: 768px)");
const touchabilityQuery = matchMedia("(pointer: coarse), (-moz-touch-enabled: 1)");
const pointerQuery = matchMedia("(any-pointer: fine)");

export const isSmallWindow: boolean = !!widthQuery.matches;
export const touchable: boolean = !!touchabilityQuery.matches;
export const pointerAvailable: boolean = !!pointerQuery.matches;

export function onWindowSizeChange(callback: (isSmallWindow: boolean) => void): void {
    widthQuery.addListener(({ matches }) => callback(!!matches));
}

export function onTouchabilityChange(callback: (touchable: boolean) => void): void {
    touchabilityQuery.addListener(({ matches }) => callback(!!matches));
}

export function onPointerChange(callback: (pointerAvailable: boolean) => void): void {
    pointerQuery.addListener(({ matches }) => callback(!!matches));
}
