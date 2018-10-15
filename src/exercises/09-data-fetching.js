/* eslint no-unused-vars: 0 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// For our data fetching needs, we're going to use `axios.get` (imported above).
//
// It is best not to fetch data from a server in the `render` method. As we
// saw in the last exercise any change to the state of a component can cause
// a re-render of the component. This will likely happen more often than we
// want. It is best to use another lifecycle method `componentDidMount` to
// make these requests. This method will be called once before the component
// is inserted into the document, regardless of how many times `render` is
// called.
//
// Example:
//
//     class UserProfile extends Component {
//         constructor(props) {
//             super(props);
//
//             this.state = {
//                 username: PropTypes.number.isRequired,
//             };
//         }
//
//         componentDidMount() {
//             this.props.fetch(`/users/${this.props.username}`)
//                 .then(
//                     ({ data: user }) => this.setState({user}),
//                     // Should add an error handler here :)
//                 )
//         }
//
//         render() {
//             const { user } = this.state;
//
//             return (
//                 <div>
//                     <div>First name: {user.firstName}</div>
//                     <div>Last name: {user.lastName}</div>
//                     <div>Email address: {user.emailAddress}</div>
//                 </div>
//             );
//         }
//     }
//
//     UserProfile.propTypes = {
//          username: PropTypes.number.isRequired,
//          fetch: PropTypes.func,
//     };
//
//     UserProfile.defaultProps = {
//         // Doing this allows you to pass a mock version as a prop
//         fetch: axios.get,
//     };
//
// See https://facebook.github.io/react/docs/component-specs.html
//
// Exercise:
//  - Create a `RepoListContainer` component that lists all the GitHub repos for a user;
//  - Allow the user to be provided as a prop.
//
//  https://api.github.com/users/{username}/repos
//
// Tip:
// - You may end up getting throttled by GitHub if you keep refreshing and making unauthenticated
//   requests to their API. To avoid this, I recommend you return some fake data in `componentDidMount`
//   and only implement that when you're done with everything else.

class RepoListContainer extends Component {
    render() {
        return (
            <div>
                User repos! Render RepoList in here. For extra credit, you should handle
                loading and error state as well.
            </div>
        );
    }
}

function RepoList({ username, repos }) {
    return <div>Render the user's name in an h1 and the repos in ul>li</div>;
}

RepoList.propTypes = {
    // Add prop types for username and repos
};

export const Example = () => <div>Render the RepoListContainer here</div>;

// This is for you!
function mockFetch() {
    // Set this to 5000 test the loading state
    const delay = 0;

    // Set this to `true` to test out the error state
    const sendError = false;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (sendError) {
                reject({
                    message: "Something went wrong",
                    status: 500,
                });
            } else {
                resolve({
                    data: [
                        { id: 12345, name: "turbo-sniffle" },
                        { id: 54321, name: "ubiquitous-succotash" },
                        { id: 43234, name: "solid-waffle" },
                    ],
                });
            }
        }, delay);
    });
}

export default RepoListContainer;
