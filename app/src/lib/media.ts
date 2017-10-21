const query = matchMedia("(max-width: 768px)");

export const isSmallWindow: boolean = !!query.matches;

export function onWindowSizeChange(callback: (isSmallWindow: boolean) => void): void {
    query.addListener(({ matches }) => callback(!!matches));
}
