import * as React from "react";

export default class extends React.Component {
    public state = {
        email: "",
        password: "",
    };

    public render() {
        return (
            <form onSubmit={() => event.preventDefault()}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={this.state.email}
                        onChange={(event) => this.setState({ email: event.target.value })}
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={this.state.password}
                        onChange={(event) => this.setState({ password: event.target.value })}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}
