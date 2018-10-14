/* eslint no-unused-vars: 0 */

import React from "react";
import PropTypes from "prop-types";

// Import the css styles using: `import './03-styling.css'`.
// This will use webpack to load the css styles into your app.

function Box(props) {
    return (
        // Render a div with the props:
        // - `className` that is assigned to `box box--${props.size}`;
        // - `style` that is assigned to `props.style inside the div,
        // forward along `props.children`.
        <div>Incomplete</div>
    );
}

// I'm gonna give this one to you :)
Box.propTypes = {
    size: PropTypes.oneOf(["small", "medium", "large"]),
    style: PropTypes.object,
    children: PropTypes.node.isRequired,
};

export const Example = () => (
    <div>
        Examples go in here... Give me 3 {`<Box>`} elements. One for each size. And
        for each, specify a `style` prop with some custom styling (whatever you
        want, maybe consider `backgroundColor`)
    </div>
);

export default Box;
