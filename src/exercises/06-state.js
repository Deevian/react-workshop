/* eslint no-unused-vars: 0 */
import React from "react";

// So far we've just been using function components.
// Now that we need to worry about state in our component, we need to use the ES6 class syntax.
// To turn an ES6 class into a React component, you extend React.Component
// (or `import { Component } from 'react'` and use that).
//
// Let's take this simple component for example:
//
//     function SayHello(props) {
//         return (
//             <div>Hello {props.firstName} {props.lastName}!</div>
//         );
//     }
//
// Here's how we'd express this using classes:
//
//     class SayHello extends React.Component {
//         render() {
//             return (
//                 <div>Hello {this.props.firstName} {this.props.lastName}!</div>
//             );
//         }
//     }
//
// From here you can now start using `this.state` in your render method and call `this.setState`
// in callback handlers (like `onClick`).
//
// Here's an example of a component that uses state:
//
//     class ClickCounter extends React.Component {
//         constructor(props) {
//             super(props);
//
//             this.state = {
//                 clicks: 0,
//             };
//
//             this.handleButtonClick = this.handleButtonClick.bind(this);
//         }
//
//         handleButtonClick() {
//             this.setState({
//                 clicks: this.state.clicks + 1
//             });
//         };
//
//         render() {
//             return (
//                 <div>
//                     <button onClick={this.handleButtonClick}>Click Me!</button>
//                     <div>Clicked {this.state.clicks} times</div>
//                 </div>
//             );
//         }
//     }
//

class StopWatch extends React.Component {
    // In here, you should initialize the state with the following properties:
    // - running: false
    // - lapse: 0
    //
    // You'll also need two private properties:
    // - timer = null (keeps track of the `setInterval` id so you can clear it)
    // - now = 0 (keeps track of the difference between the actual current
    //   time and when start was started)
    //
    // In your render method, you'll render a div wrapper with a label that renders
    // {this.state.lapse} and two buttons (Start / Stop, and Clear).
    //
    // You'll need to have `onClick` handlers for the <buttons>.
    //
    // And you'll also need to have start and stop methods which your click handlers
    // will use to start and stop the setInterval
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

        return <div style={{ textAlign: "center" }}>Stop Watch!</div>;
    }
}

// We don't need to do anything fancy here even with `props`,
// because the <StopWatch /> component tracks its own state!
export const Example = () => <StopWatch/>;

export default StopWatch;
