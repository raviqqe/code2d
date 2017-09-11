function isNotificationSupported() {
    return "Notification" in window;
}

function permission(): "default" | "granted" | "denied" {
    return (Notification as any).permission;
}

export async function requestPermission(): Promise<void> {
    if (isNotificationSupported() && permission() === "default") {
        await new Promise((resolve) => Notification.requestPermission(resolve));
    }
}

export function notify(message: string): void {
    if (isNotificationSupported() && permission() === "granted") {
        const _ = new Notification(message);
    }
}
