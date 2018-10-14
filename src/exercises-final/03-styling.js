import React from "react";
import PropTypes from "prop-types";
import "./03-styling.css";

function Box(props) {
    return (
        <div className={`box box--${props.size}`} style={props.style}>
            {props.children}
        </div>
    );
}

// I'm gonna give this one to you :D
Box.propTypes = {
    size: PropTypes.oneOf(["small", "medium", "large"]),
    style: PropTypes.object,
    children: PropTypes.node.isRequired,
};

export const Example = () => (
    <div>
        <Box size="small" style={{ backgroundColor: "lightblue" }}>
            I'm in a small box!
        </Box>
        <Box size="medium" style={{ backgroundColor: "lightgreen" }}>
            I'm in a medium box!
        </Box>
        <Box size="large" style={{ backgroundColor: "orange" }}>
            I'm in a large box!
        </Box>
    </div>
);

export default Box;
