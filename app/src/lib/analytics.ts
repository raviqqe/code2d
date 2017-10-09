import * as reactGa from "react-ga";

import config from "../config";

export function initialize(): void {
    reactGa.initialize(config.google.analytics.trackingId, { titleCase: false });
}
