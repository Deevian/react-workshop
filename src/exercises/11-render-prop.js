/* eslint no-unused-vars: 0 */
import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// Higher Order components are great, but they suffer from a few short-comings:
// - You must create a component to pass to the HoC function;
// - Your props / state share a namespace;
// - Adding a HoC adds a layer of indirection resulting in less flexibility.
//
// A great alternative to Higher Order Components is "render callbacks" (formally known as
// "Function as Child components). Learn more about them here:
// https://medium.com/merrickchristensen/function-as-child-components-5f3920a9ace9
// As of version 4 (alpha) of `react-router`, it follows this pattern.
//
// In this exercise, we're going to refactor the data-fetching example code to keep all the
// state and imperative code in one component, and all the UI rendering in a stateless,
// declarative function component.
//
// Example:
//
//     class FetchUserProfile extends Component {
//         constructor(props) {
//             super(props);
//         }
//
//         componentDidMount() {
//             this.props.fetch(`/users/${this.props.username}`)
//                 .then(
//                     ({ data: user }) => this.setState({ user }),
//                     // Should add an error handler here :)
//                 );
//         }
//
//         render() {
//             // Doesn't have to be `children` prop. Can be anything.
//             return this.props.children(this.state)
//         }
//     }
//
//     FetchUserProfile.propTypes = {
//         username: PropTypes.number.isRequired,
//         fetch: PropTypes.func,
//     };
//
//     FetchUserProfile.defaultProps = {
//         // Doing this allows you to pass a mock version as a prop
//         fetch: axios.get
//     };
//
//     function UserProfile({ username, ...rest }) {
//         return (
//             <FetchUserProfile username={username} {...rest}>
//             {({ user }) => (
//                 <div>
//                     <div>First name: {user.firstName}</div>
//                     <div>Last name: {user.lastName}</div>
//                     <div>Email address: {user.emailAddress}</div>
//                 </div>
//             )}
//             </FetchUserProfile>
//         );
//     }
//
//     UserProfile.propTypes = {
//       username: PropTypes.number.isRequired
//     };
//
// Ultimately, you can take this further to a generic Fetch component which can making
// subsequent requests on prop changes, caching, multiple requests in parallel, etc.
// Then you can write all your imperative tests around that generic Fetch component
// and the rest of your components can be much more declarative and more easily tested
//
// Exercise:
// - Refactor the original component to use the render callback pattern.

class FetchRepoList extends Component {
    // Put all the state related stuff in this component and pass the state to the
    // `children` render callback in `render`.
    render() {
        return null;
    }
}

// Refactor this to be a function component that uses <FetchRepoList>.
class RepoListContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            repos: null,
            loading: false,
            error: null,
        };

        this.fetchRepos = this.fetchRepos.bind(this);
    }

    componentDidMount() {
        this.fetchRepos();
    }

    fetchRepos() {
        this.setState({
            repos: null,
            loading: true,
            error: null,
        });

        this.props
            .fetch(
                `https://api.github.com/users/${this.props.username}/repos?per_page=100&sort=pushed`,
            )
            .then(
                ({ data: repos }) => this.setState({
                    repos,
                    error: null,
                    loading: false,
                }),
                (error) => this.setState({
                    repos: null,
                    error,
                    loading: false,
                }),
            );
    }

    render() {
        const { repos, loading, error } = this.state;
        const { username } = this.props;

        return (
            <div>
                {loading ? (
                    <div>Loading...</div>
                ): null}

                {error ? (
                    <div>
                        Error loading info for <code>{username}</code>
                        <pre>{JSON.stringify(error, null, 2)}</pre>
                    </div>
                ): null}

                {repos ? (
                    <RepoList username={username} repos={repos} />
                ) : null}
            </div>
        );
    }
}

RepoListContainer.propTypes = {
    username: PropTypes.string.isRequired,
    fetch: PropTypes.func,
};

RepoListContainer.defaultProps = {
    fetch: axios.get,
};

function RepoList({ username, repos }) {
    return (
        <div>
            <h1>{username}'s repos</h1>
            <ul style={{ textAlign: "left" }}>
                {repos.map((repo) => {
                    return <li key={repo.id}>{repo.name}</li>;
                })}
            </ul>
        </div>
    );
}

RepoList.propTypes = {
    username: PropTypes.string.isRequired,
    repos: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
        }),
    ).isRequired,
};

export const Example = () => (
    <RepoListContainer username="deevian" fetch={mockFetch} />
);

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
