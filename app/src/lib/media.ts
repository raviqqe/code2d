export function isSmartphone(): boolean {
    return !!matchMedia("(max-width: 768px)").matches;
}
