export async function sleep(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
}

export async function dispatch(store, action) {
    store.dispatch(action);
    await sleep(100);
}

function convertToLocaleDate(source: any): string {
    return (new Date(source)).toLocaleDateString();
}

export function formatDate(source: string): string | null {
    const date = convertToLocaleDate(source);

    if (date !== "Invalid Date") {
        return date;
    }

    const timeStamp = parseInt(source, 10) * 1000;

    if (Date.parse("1993-04-30") < timeStamp && timeStamp < Date.now()) {
        return convertToLocaleDate(timeStamp);
    }

    // If source is not too long, it should represent a date.
    if (source.length < 30) {
        return source;
    }

    return null;
}
