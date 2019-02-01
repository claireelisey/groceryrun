import React from 'react';
import { Link } from 'react-router-dom';
import {
    AppBar,
    Button,
    Toolbar,
    Typography,
    withStyles,
} from '@material-ui/core';
import LoginButton from './LoginButton';

const styles = {
    flex: {
        flex: 1,
    },
};

const AppHeader = ({ classes }) => (
    <AppBar position="static">
        <Toolbar>
            <Typography variant="title" color="inherit">
                GroceryRun
            </Typography>
            <Button color="inherit" component={Link} to="/">Home</Button>
            <Button color="inherit" component={Link} to="/posts">Grocery Lists</Button>
            <Button color="inherit" component={Link} to="/items">Items Manager</Button>
            <Button color="inherit" component={Link} to="/checklistitems">Checklist Manager</Button>
            <div className={classes.flex} />
            <LoginButton />
        </Toolbar>
    </AppBar>
);
 
export default withStyles(styles)(AppHeader);