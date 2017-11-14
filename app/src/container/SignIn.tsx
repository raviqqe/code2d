import * as React from "react";
import GitHub = require("react-icons/lib/go/mark-github");
import { connect } from "react-redux";

import Button from "../component/Button";
import FacebookButton from "../component/FacebookButton";
import Feature from "../component/Feature";
import Link from "../component/Link";
import Screenshots from "../component/Screenshots";
import TwitterButton from "../component/TwitterButton";
import config from "../config";
import { actionCreators } from "../redux/authentication";
import "./style/SignIn.css";

interface IProps {
    signedIn: boolean;
    signIn: () => void;
}

class SignIn extends React.Component<IProps> {
    public render() {
        return (
            <div className="SignIn-container">
                <div className="SignIn-main">
                    <div className="SignIn-title-container">
                        <img className="SignIn-icon" src={require("../images/icon.svg")} />
                        <div className="SignIn-title">{config.name}</div>
                        <div className="SignIn-short-description">
                            Todo management tools for software engineers
                        </div>
                    </div>
                    <Button className="SignIn-button" onClick={this.props.signIn}>
                        <GitHub /> Sign in with GitHub
                    </Button>
                </div>
                <div className="SignIn-description">
                    <div className="SignIn-overview">
                        <div className="SignIn-overview-title">
                            Make your todos done
                        </div>
                        <div className="SignIn-overview-text">
                            code2d is a set of todo management tools.
                            Keep you productive and learning new things everyday!
                        </div>
                    </div>
                    <div className="SignIn-features">
                        <Feature
                            title="Manage everything to do"
                            image={require("../images/tasks.svg")}
                        >
                            Manage tasks to do,
                            articles to read,
                            videos to watch,
                            and books to read
                            in one place.
                        </Feature>
                        <Feature
                            title={
                                <Link colored={true} href={config.chrome.extensionUrl}>
                                    Chrome browser support
                                </Link>}
                            image={require("../images/chrome.svg")}
                        >
                            Install <Link colored={true} href={config.chrome.extensionUrl}>the Chrome extension</Link>.
                            It allows you to add artciles, videos, and books
                            shown in current tabs to todo lists by one click.
                        </Feature>
                        <Feature
                            title="Built-in pomodoro timer"
                            image={require("../images/timer.svg")}
                        >
                            Use pomodoro technique to be productive
                            and make your work done faster.
                        </Feature>
                        <Feature
                            title="Pursue trends"
                            image={require("../images/flame.svg")}
                        >
                            Don't miss any trending article, video, or book.
                            Update yourself with the latest information.
                        </Feature>
                        <Feature
                            title="Focus on engineering"
                            image={require("../images/focus.svg")}
                        >
                            Keep other things away and grow yourself.
                        </Feature>
                    </div>
                </div>
                <Screenshots />
                <div className="SignIn-footer">
                    <div className="SignIn-social-buttons">
                        <FacebookButton />
                        <TwitterButton />
                    </div>
                    <Link href={config.feedbackUrl}>Feedback</Link>
                    <Link href={config.repositoryUrl}>GitHub</Link>
                    <Link href="/terms_of_use.pdf">Terms of Use</Link>
                    <Link href="/privacy_policy.pdf">Privacy Policy</Link>
                </div>
            </div>
        );
    }
}

export default connect(({ authentication }) => authentication, actionCreators)(SignIn);
