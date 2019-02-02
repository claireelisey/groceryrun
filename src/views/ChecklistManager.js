import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
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
    Checkbox
} from '@material-ui/core';
import { Delete as DeleteIcon, Add as AddIcon } from '@material-ui/icons';
import { find } from 'lodash';
import { compose } from 'recompose';

import ChecklistEditor from '../components/ChecklistEditor';

const styles = theme => ({
    checklistitems: {
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

class ChecklistManager extends Component {

    state = {
        loading: true,
        checklistitems: [],
        checked: [0]
    };

    componentDidMount() {
        this.getChecklistItems();
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

    async getChecklistItems() {
        this.setState({ loading: false, checklistitems: await this.fetch('get', '/checklistitems') });
    }

    saveChecklistItem = async (checklistitem) => {
        if (checklistitem.id) {
            await this.fetch('put', `/checklistitems/${checklistitem.id}`, checklistitem);
        } else {
            await this.fetch('post', '/checklistitems', checklistitem);
        }

        this.props.history.goBack();
        this.getChecklistItems();
    }

    async deleteChecklistItem(checklistitem) {
        if (window.confirm(`Are you sure you want to delete "${checklistitem.body}"`)) {
            await this.fetch('delete', `/checklistitems/${checklistitem.id}`);
            this.getChecklistItems();
        }
    }

    renderChecklistEditor = ({ match: { params: { id } } }) => {
        if (this.state.loading) return null;
        const checklistitem = find(this.state.checklistitems, { id: Number(id) });

        if (!checklistitem && id !== 'new') return <Redirect to="/items" />;

        return <ChecklistEditor checklistitem={checklistitem} onSave={this.saveChecklistItem} />;
    };

    handleToggle = checklistitem => () => {
        const { checked } = this.state;
        const currentIndex = checked.indexOf(checklistitem);
        const newChecked = [...checked];

        if (currentIndex === -1) {
        newChecked.push(checklistitem);
        } else {
        newChecked.splice(currentIndex, 1);
        }

        this.setState({
        checked: newChecked,
        });
    };

    render() {

        const { classes } = this.props;

        return (
            <Fragment>

                <Typography variant="display1">Checklist Manager</Typography>

                {this.state.checklistitems.length > 0 ? (

                    <Paper elevation={1} className={classes.checklistitems}>

                        <List>
                            { this.state.checklistitems.map( (checklistitem, index) => 
                                <ListItem key={checklistitem.id} role={undefined} dense button onClick={this.handleToggle(checklistitem.id)} component={Link} to={`/checklistitems/${checklistitem.id}`}>
                                    <Checkbox
                                    checked={this.state.checked}
                                    tabIndex={-1}
                                    disableRipple
                                    />
                                    <ListItemText primary={checklistitem.body} />
                                    <ListItemSecondaryAction>
                                        <IconButton onClick={() => this.deleteChecklistItem(checklistitem)} color="inherit">
                                            <DeleteIcon />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )}
                        </List>

                    </Paper>

                ) : (
                !this.state.loading && <Typography variant="subheading">No checklist items to display</Typography>
                )}

                <Button
                    variant="fab"
                    color="secondary"
                    aria-label="add"
                    className={classes.fab}
                    component={Link}
                    to="/checklistitems/new"
                    >
                    <AddIcon />
                </Button>
                
                <Route exact path="/checklistitems/:id" render={this.renderChecklistEditor} />
            </Fragment>

        );
    }
}

ChecklistManager.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withAuth,
    withRouter,
    withStyles(styles),
)(ChecklistManager);