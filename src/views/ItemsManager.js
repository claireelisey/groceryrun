import React, { Component, Fragment } from 'react';
import { withAuth } from '@okta/okta-react';
import { withRouter, Route, Redirect, Link } from 'react-router-dom';
import {
    withStyles,
    Typography,
    Button,
    IconButton,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
} from '@material-ui/core';
import { Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons';
import moment from 'moment';
import { find, orderBy } from 'lodash';
import { compose } from 'recompose';

import ItemEditor from '../components/ItemEditor';

const styles = theme => ({
    items: {
        marginTop: 2 * theme.spacing.unit,
    },
    fab: {
        position: 'absolute',
        bottom: 3 * theme.spacing.unit,
        right: 3 * theme.spacing.unit,
        [theme.breakpoints.down('xs')]: {
        bottom: 2 * theme.spacing.unit,
        right: 2 * theme.spacing.unit,
        },
    },
});

const API = process.env.REACT_APP_API || 'http://localhost:3001';

class ItemsManager extends Component {
    state = {
        loading: true,
        items: [],
    };

    componentDidMount() {
        this.getItems();
    }

    async fetch(method, endpoint, body) {
        try {
        const response = await fetch(`${API}${endpoint}`, {
            method,
            body: body && JSON.stringify(body),
            headers: {
                'content-type': 'application/json',
                accept: 'application/json',
                authorization: `Bearer ${await this.props.auth.getAccessToken()}`,
            },
        });
        return await response.json();
        } catch (error) {
            console.error(error);
        }
    }

    async getItems() {
        this.setState({ loading: false, items: await this.fetch('get', '/items') });
    }

    saveItem = async (item) => {
        if (item.id) {
            await this.fetch('put', `/items/${item.id}`, item);
        } else {
            await this.fetch('post', '/items', item);
        }

        this.props.history.goBack();
        this.getItems();
    }

    async deleteItem(item) {
        if (window.confirm(`Are you sure you want to delete "${item.title}"`)) {
            await this.fetch('delete', `/items/${item.id}`);
            this.getItems();
        }
    }

    renderItemEditor = ({ match: { params: { id } } }) => {
        if (this.state.loading) return null;
        const item = find(this.state.items, { id: Number(id) });

        if (!item && id !== 'new') return <Redirect to="/items" />;

        return <ItemEditor item={item} onSave={this.saveItem} />;
    };

    render() {
        const { classes } = this.props;

        return (

            <Fragment>
                <Typography variant="display1">Items Manager</Typography>

                {this.state.items.length > 0 ? (
                    <Paper elevation={1} className={classes.items}>
                        <List>
                        {orderBy(this.state.items, ['updatedAt', 'title'], ['desc', 'asc']).map(item => (
                            <ListItem key={item.id} button component={Link} to={`/items/${item.id}`}>
                            <ListItemText
                                primary={item.title}
                                secondary={item.updatedAt && `Updated ${moment(item.updatedAt).fromNow()}`}
                            />
                            <ListItemSecondaryAction>
                                <IconButton onClick={() => this.deleteItem(item)} color="inherit">
                                <DeleteIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                            </ListItem>
                        ))}
                        </List>
                    </Paper>
                ) : (
                !this.state.loading && <Typography variant="subheading">No items to display</Typography>
                )}

                <Button
                    variant="fab"
                    color="secondary"
                    aria-label="add"
                    className={classes.fab}
                    component={Link}
                    to="/items/new"
                    >
                    <AddIcon />
                </Button>

                <Route exact path="/items/:id" render={this.renderItemEditor} />
            </Fragment>
            
        );
    }
}

export default compose(
    withAuth,
    withRouter,
    withStyles(styles),
)(ItemsManager);