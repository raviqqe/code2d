import * as React from "react";
import { connect } from "react-redux";

import { IVideo } from "../lib/videos";
import CreateVideo from "./CreateVideo";
import ItemsMenu from "./ItemsMenu";
import SimpleVideo from "./SimpleVideo";
import TrendingItems from "./TrendingItems";

interface IProps {
    done: boolean;
    onItemsStateChange: (done: boolean) => void;
    trendingItems: IVideo[];
}

class VideosMenu extends React.Component<IProps> {
    public render() {
        const { trendingItems } = this.props;

        return (
            <ItemsMenu
                {...this.props}
                createItem={<CreateVideo />}
                doneButtonText="watched"
                todoButtonText="to watch"
            >
                <TrendingItems itemComponent={SimpleVideo} trendingItems={trendingItems} />
            </ItemsMenu>
        );
    }
}

export default connect(({ videos }) => videos)(VideosMenu);
