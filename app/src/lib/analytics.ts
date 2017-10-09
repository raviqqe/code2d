import * as reactGa from "react-ga";

import config from "../config";

window.onerror = (description) => reactGa.exception({ description });

export function initialize(): void {
    reactGa.initialize(config.google.analytics.trackingId, { titleCase: false });
}

export function setUserId(userId: string): void {
    reactGa.set({ userId });
}
