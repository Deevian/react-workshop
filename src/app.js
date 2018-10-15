import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { css } from "emotion";

import Exercises from "./exercises";
import Final, { List } from "./exercises-final";

const containerClassName = css`
    display: flex;

    margin-left: 1.5rem;
    margin-right: 1.5rem;

    & > * {
        padding-left: 0.75rem;
        padding-right: 0.75rem;
        border-right: 1px solid;
    }

    & > *:last-child {
        padding-right: 0;
        border-right: none;
    }
`;

const firstColumnClassName = css`
    width: 15rem;
    min-width: 200px;
    max-width: 400px;
`;

const titleClassName = css`
    text-align: center;
`;

const columnClassName = css`
    flex: 1;
`;

function App() {
    return (
        <Router>
            <Route
                path="/"
                render={(props) => (
                    <div className={containerClassName}>
                        <div className={firstColumnClassName}>
                            <h1 className={titleClassName}>
                                Exercises
                            </h1>

                            <List {...props} />
                        </div>
                        <div className={columnClassName}>
                            <h1 className={titleClassName}>
                                Your Implementation
                            </h1>

                            <Exercises {...props} />
                        </div>
                        <div className={columnClassName}>
                            <h1 className={titleClassName}>
                                Final Implementation
                            </h1>

                            <Final {...props} />
                        </div>
                    </div>
                )}
            />
        </Router>
    );
}

export default App;
