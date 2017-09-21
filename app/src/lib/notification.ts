function isNotificationSupported() {
    return "Notification" in window;
}

export function permission(): boolean | null {
    switch ((Notification as any).permission) {
        case "default": return null;
        case "granted": return true;
        case "denied": return false;
    }

    throw new Error("Invalid permission.");
}

export async function requestPermission(): Promise<boolean | null> {
    if (!isNotificationSupported()) {
        return null;
    }

    await new Promise((resolve) => Notification.requestPermission(resolve));
    return permission();
}

export function notify(message: string): void {
    if (isNotificationSupported() && permission()) {
        const _ = new Notification(message);
    }
}
