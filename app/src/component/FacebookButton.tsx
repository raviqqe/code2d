import * as React from "react";

import config from "../config";

export default class extends React.Component {
    public render() {
        return (
            <iframe
                src={"https://www.facebook.com/plugins/share_button.php" +
                    `?href=https%3A%2F%2F${config.domain}` +
                    "&layout=button" +
                    "&size=large" +
                    "&mobile_iframe=true" +
                    `&appId=${config.facebook.appId}` +
                    "&width=83" +
                    "&height=28"}
                width={83}
                height={28}
                style={{ border: "none", overflow: "hidden" }}
                scrolling="no"
                frameBorder={0}
                allowTransparency={true}
            />
        );
    }
}
