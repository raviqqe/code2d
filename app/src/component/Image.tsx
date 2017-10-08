import * as React from "react";

import Link from "./Link";
import "./style/Image.css";

interface IProps {
    href?: string;
    src: string;
}

export default class extends React.Component<IProps> {
    public render() {
        const { href, src } = this.props;
        const image = <img className="Image-container" src={src} />;

        if (href) {
            return <Link href={href}>{image}</Link>;
        }

        return image;
    }
}
