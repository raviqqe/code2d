export async function sleep(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
}

export async function dispatch(store, action) {
    store.dispatch(action);
    await sleep(100);
}

export function isDate(date: any): boolean {
    return date && (new Date(date)).toString() !== "Invalid Date";
}
