import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { SecureRoute, ImplicitCallback } from '@okta/okta-react';
import {
    CssBaseline,
    withStyles,
} from '@material-ui/core';

import AppHeader from './components/AppHeader';
import Home from './views/Home';
import PostsManager from './views/PostsManager';
import ItemsManager from './views/ItemsManager';

const styles = theme => ({
    main: {
        padding: 3 * theme.spacing.unit,
        [theme.breakpoints.down('xs')]: {
        padding: 2 * theme.spacing.unit,
        },
    },
});

const App = ({ classes }) => (

    <Fragment>

        <CssBaseline />
        <AppHeader />

        <main className={classes.main}>
            <Route exact path="/" component={Home} />
            <SecureRoute exact path="/posts" component={PostsManager} />
            <SecureRoute exact path="/items" component={ItemsManager} />
            <Route path="/implicit/callback" component={ImplicitCallback} />
        </main>

    </Fragment>
    
);

export default withStyles(styles)(App);