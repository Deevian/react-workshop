import React, { Component } from "react";
import PropTypes from "prop-types";

class NameForm extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        alert(this.input.value);
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name:
                    <input
                        type="text"
                        defaultValue={this.props.defaultName}
                        ref={(node) => (this.input = node)}
                    />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

NameForm.propTypes = {
    defaultName: PropTypes.string,
};

export const Example = () => <NameForm defaultName="Marcy" />;

export default NameForm;
