import React, { Component } from "react";
import PropTypes from "prop-types";

class ContrivedComponent extends Component {
    state = {
        // Can also be initialized in the constructor
        clicks: 0,
    };

    static propTypes = {
        setExternalState: PropTypes.func,
    };

    static defaultProps = {
        setExternalState: () => {}
    };

    /**
     * Often you don't need a constructor, and most of the time you want
     * to avoid doing things with props in here, but this is a contrived
     * component, so I'm doing fancy stuff!
     */
    constructor(props) {
        super(props);

        this.externalState = { constructor: 1 };

        console.log("constructor");

        props.setExternalState(this.externalState);
    }

    /**
     * Called right after mounting (and therefore, after render).
     * If you need to initialize DOM stuff (like a jQuery plugin) that goes here.
     * Network requests go here.
     * Calling `setState` will result in an immediate re-render, so generally avoid it.
     * That said, calling `setState` in an async callback in here is and you'll likely do it often.
     */
    componentDidMount() {
        this.push("componentDidMount");
    }

    /**
     * Useful for serious optimizations _after_ profiling.
     * Called before rendering an already mounted component.
     * Returning `false` will prevent the `render` from being called, along with related
     * lifecycle methods.
     * You may consider extending from React.PureComponent which will do a shallow prop / state
     * comparison for you, but, again, only after profiling.
     */
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        this.push("shouldComponentUpdate", { nextProps, nextState, nextContext });
        return nextProps.shouldUpdate;
    }

    /**
     * Called right before the invocation of the `render` method, this lifecycle method is
     * _static_, and used to update the state based on the new props.
     * Being static, this can't directly access the class properties and methods.
     * This should either return an object to update the state, or nothing at all.
     */
    static getDerivedStateFromProps() {
        console.log("getDerivedStateFromProps");
    }

    /**
     * Called right before the the most recently rendered output is committed to the DOM (e.g.).
     * It allows you to capture some information from your rendered component right before
     * it is updated.
     * The returned value is passed as a parameter to `componentDidUpdate`.
     */
    getSnapshotBeforeUpdate() {
        this.push("getSnapshotBeforeUpdate");
        return null;
    }

    /**
     * Called right after re-rendering a mounted component.
     * Good to operate on the updated DOM (like with a jQuery plugin).
     * Good for making network requests (make sure to compare previous props with current props).
     */
    componentDidUpdate(prevProps, prevState, nextContext) {
        this.push("componentDidUpdate", { prevProps, prevState, nextContext });
    }

    /**
     * Called right before a mounted component is unmounted and destroyed.
     * This is where you clean up after yourself to avoid memory leaks.
     * Remove custom added event handlers, remove elements you created yourself,
     * cancel network requests, clearInterval, etc.
     */
    componentWillUnmount() {
        this.push("componentWillUnmount");
    }

    /**
     * This is an event handler used in render.
     */
    onButtonClick = () => {
        const { clicks } = this.state;
        const newClicks = clicks + 1;
        const groupName = `Child state update: clicks ${newClicks}`;

        console.groupCollapsed(groupName);

        this.setState({ clicks: newClicks }, () => {
            console.groupEnd(groupName);
        });
    };

    /**
     * This is an event handler used in render.
     */
    onForceUpdateClick = () => {
        const groupName = "force update";

        console.groupCollapsed(groupName);

        this.forceUpdate(() => {
            console.groupEnd(groupName);
        });
    };

    render() {
        this.push("render");

        const { clicks } = this.state;

        return (
            <div style={{ padding: 20, border: "solid 4px #ddd" }}>
                <p>
                    Hi! I'm the child. Here are my props:
                </p>

                <pre>
                    {JSON.stringify(this.props, null, 2)}
                </pre>

                <div>
                    <button onClick={this.onButtonClick}>
                        Click me
                    </button> to update state. Clicks: {clicks}
                </div>

                <br />

                <div>
                    <button onClick={this.onForceUpdateClick}>
                        Force update
                    </button>
                </div>
            </div>
        );
    }

    /**
     * Don't look here, this is nothing :)
     */
    push(name, args = {}) {
        if (!this.externalState.hasOwnProperty(name)) {
            this.externalState[name] = [];
        }

        const thingToPush = {
            ...args,
            props: this.props,
            state: this.state,
        };

        this.externalState[name].push(thingToPush);
    }
}

class ContrivedComponentContainer extends Component {
    state = {
        renderChild: true,
        shouldChildUpdate: true,
        count: 0,
    };

    childState = null;

    componentWillMount() {
        console.groupCollapsed("Mounting -> Mounted");
    }

    componentDidMount() {
        console.groupEnd("Mounting -> Mounted");
    }

    toggleRenderChild = (event) => {
        this.childState = null;

        const { checked: renderChild } = event.target;
        const groupName = `Parent state update: renderChild ${renderChild}`;

        this.setStateWithLog(groupName, { renderChild });
    };

    toggleShouldChildUpdate = (event) => {
        const { checked: shouldChildUpdate } = event.target;
        const groupName = `Parent state update: shouldChildUpdate ${shouldChildUpdate}`;

        this.setStateWithLog(groupName, { shouldChildUpdate });
    };

    increment = () => {
        const { count } = this.state;
        const newCount = count + 1;
        const groupName = `Parent state update: count ${newCount}`;

        this.setStateWithLog(groupName, { count: newCount });
    };

    setStateWithLog(groupName, state) {
        console.groupCollapsed(groupName);

        this.setState(state, () => {
            console.groupEnd(groupName);
        });
    }

    render() {
        const { renderChild, shouldChildUpdate } = this.state;

        return (
            <div>
                <h2>
                    Hi! I'm a contrived component
                </h2>
                <h3>
                    Don't worry, you don't have to do anything with this one. Just explore
                    the code :)
                </h3>
                <p>
                    I'm here to teach you about the component API! I'll update every time
                    you click this button to show you what lifecycle events have happened
                    on my child component:
                </p>
                <p>
                    <button onClick={this.increment}>Increment and update</button>
                </p>
                <p>
                    Also, check out the console which may be slightly more instructive :)
                </p>
                <div>
                    <label>
                        Mount child:

                        <input
                            type="checkbox"
                            checked={renderChild}
                            onChange={this.toggleRenderChild}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Should child component update?

                        <input
                            type="checkbox"
                            checked={shouldChildUpdate}
                            onChange={this.toggleShouldChildUpdate}
                        />
                    </label>
                </div>
                <br />

                {renderChild ? (
                    <ContrivedComponent
                        count={this.state.count}
                        setExternalState={state => (this.childState = state)}
                        shouldUpdate={shouldChildUpdate}
                    />
                ) : null}

                <pre>
                    {JSON.stringify(this.childState, null, 2)}
                </pre>
            </div>
        );
    }
}

export const Example = () => <ContrivedComponentContainer/>;

export default ContrivedComponentContainer;
