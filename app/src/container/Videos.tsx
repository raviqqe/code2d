import * as React from "react";
import { connect } from "react-redux";

import ItemList from "../component/ItemList";
import Video from "../component/Video";
import VideosMenu from "../component/VideosMenu";
import { IVideo } from "../lib/videos";
import { actionCreators } from "../redux/videos";
import Items from "./Items";

interface IProps {
    currentItem: IVideo | null;
    items: IVideo[];
    done: boolean;
    setCurrentItem: (video: IVideo) => void;
    setItems: (videos: IVideo[]) => void;
}

class Videos extends React.Component<IProps> {
    public render() {
        const { currentItem, done, items } = this.props;

        return (
            <Items
                currentItem={currentItem &&
                    <Video detailed={true} done={done} {...currentItem} />}
                list={
                    <ItemList
                        component={Video}
                        {...this.props}
                        items={items}
                    />}
                menu={<VideosMenu />}
            />
        );
    }
}

export default connect(({ videos }) => videos, actionCreators)(Videos);
