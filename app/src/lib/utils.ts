async function sleep(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
}

export async function dispatch(store, action) {
    store.dispatch(action);
    await sleep(100);
}
