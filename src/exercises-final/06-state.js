import React from "react";

class StopWatch extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            running: false,
            lapse: 0
        };

        this.now = 0;
        this.timer = null;

        this.handleRunClick = this.handleRunClick.bind(this);
        this.handleClearClick = this.handleClearClick.bind(this);
    }

    componentWillUnmount() {
        this.stop();
    }

    handleRunClick() {
        if (this.state.running) {
            this.stop();
        } else {
            this.start();
        }
    };

    handleClearClick() {
        this.stop();
        this.now = 0;

        this.setState({ lapse: 0 });
    };

    start() {
        this.timer = setInterval(() => {
            this.setState({
                lapse: Date.now() - this.now,
            });
        });

        this.now = Date.now() - this.state.lapse;
        this.setState({ running: true });
    }

    stop() {
        clearInterval(this.timer);
        this.timer = null;

        this.setState({ running: false });
    }

    render() {
        const labelStyles = { fontSize: "5em", display: "block" };
        const buttonStyles = {
            border: "1px solid #ccc",
            background: "#fff",
            fontSize: "2em",
            padding: "15px",
            margin: "0 5px",
            width: "200px",
        };

        return (
            <div style={{ textAlign: "center" }}>
                <label style={labelStyles}>
                    {this.state.lapse}ms
                </label>
                <button style={buttonStyles} onClick={this.handleRunClick}>
                    {this.state.running ? "Stop" : "Start"}
                </button>
                <button style={buttonStyles} onClick={this.handleClearClick}>
                    Clear
                </button>
            </div>
        );
    }
}

// We don't need to do anything fancy here even with `props`,
// because the <StopWatch /> component tracks its own state!
export const Example = () => <StopWatch/>;

export default StopWatch;
