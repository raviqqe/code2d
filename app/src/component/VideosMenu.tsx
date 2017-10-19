import * as React from "react";
import { connect } from "react-redux";

import { IVideo } from "../lib/videos";
import { actionCreators } from "../redux/videos";
import CreateMediaItem from "./CreateMediaItem";
import ItemsMenu from "./ItemsMenu";
import SimpleVideo from "./SimpleVideo";
import TrendingItems from "./TrendingItems";

interface IProps {
    createItem: (url: string) => void;
    done: boolean;
    onItemsStateChange: (done: boolean) => void;
    trendingItems: IVideo[];
}

class VideosMenu extends React.Component<IProps> {
    public render() {
        const { createItem, trendingItems } = this.props;

        return (
            <ItemsMenu
                {...this.props}
                createItem={
                    <CreateMediaItem
                        createItem={createItem}
                        placeholder="YouTube video URL"
                    />}
                doneButtonText="watched"
                todoButtonText="to watch"
            >
                <TrendingItems itemComponent={SimpleVideo} trendingItems={trendingItems} />
            </ItemsMenu>
        );
    }
}

export default connect(({ videos }) => videos, actionCreators)(VideosMenu);
