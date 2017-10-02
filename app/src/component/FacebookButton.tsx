import * as React from "react";

export default class extends React.Component {
    public render() {
        return (
            <iframe
                src={"https://www.facebook.com/plugins/share_button.php" +
                    `?href=https%3A%2F%2F${process.env.REACT_APP_DOMAIN}` +
                    "&layout=button" +
                    "&size=large" +
                    "&mobile_iframe=true" +
                    `&appId=${process.env.REACT_APP_FACEBOOK_APP_ID}` +
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
