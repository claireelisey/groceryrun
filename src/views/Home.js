import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import { withAuth } from '@okta/okta-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
    withStyles,
    Typography,
    Button,
    Grid,
    Card,
    CardMedia,
    CardContent,
} from '@material-ui/core';
import { compose } from 'recompose';

const styles = theme => ({
    appBar: {
        position: 'relative',
    },
    icon: {
        marginRight: theme.spacing.unit * 2,
    },
    heroUnit: {
        backgroundColor: theme.palette.background.paper,
    },
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
    heroButtons: {
        marginTop: theme.spacing.unit * 4,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 6,
    },
});




class Home extends Component {

    state = {
        authenticated: null,
        user: null,
        menuAnchorEl: null,
    };

    componentDidUpdate() {
        this.checkAuthentication();
    }

    componentDidMount() {
        this.checkAuthentication();
    }

    async checkAuthentication() {
        const authenticated = await this.props.auth.isAuthenticated();
        if (authenticated !== this.state.authenticated) {
            const user = await this.props.auth.getUser();
            this.setState({ authenticated, user });
        }
    }

    login = () => this.props.auth.login();




    render() {

        const { classes } = this.props;

        return (

            <Fragment>

                <main>

                    {/* Hero unit */}
                    <div className={classes.heroUnit}>
                        <div className={classes.heroContent}>

                            <Typography variant="display1" align="center" color="textPrimary" gutterBottom>
                                Welcome to GroceryRun
                            </Typography>
                            <Typography align="center" color="textSecondary" paragraph>
                                An application for users to create grocery lists and share with others in real-time.
                            </Typography>

                            <div className={classes.heroButtons}>
                                <Grid container spacing={16} justify="center">
                                    <Grid item>
                                        <Button variant="contained" color="primary" onClick={this.login}>
                                            Sign up
                                        </Button>
                                    </Grid>
                                </Grid>
                            </div>

                        </div>
                    </div>

                    <div className={classNames(classes.layout, classes.cardGrid)}>

                    {/* End hero unit */}
                        <Grid container spacing={40}>

                            <Grid item sm={6} md={4} lg={3}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
/*                                         image={require('../public/assets/images/shop.png')} */
                                        image={"http://claireelise.co/wp-content/uploads/2019/02/share-1.png"}
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography variant="title" gutterBottom>
                                            Create
                                        </Typography>
                                        <Typography>
                                            Running out of milk again? Start a grocery list to refer to later on your run to the store.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item sm={6} md={4} lg={3}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
/*                                         image={require('../public/assets/images/shop.png')} */
                                        image={"http://claireelise.co/wp-content/uploads/2019/02/mark.png"}
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography variant="title" gutterBottom>
                                            Share
                                        </Typography>
                                        <Typography>
                                            Share your grocery list with multiple people who can all mark items off in real-time.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                            <Grid item sm={6} md={4} lg={3}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
/*                                         image={require('../public/assets/images/shop.png')} */
                                        image={"http://claireelise.co/wp-content/uploads/2019/02/shop.png"}
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography variant="title" gutterBottom>
                                            Shop
                                        </Typography>
                                        <Typography>
                                            Grab some helpers and make your grocery run faster and easier than ever before.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>

                        </Grid>

                    </div>

                </main>

            </Fragment>
            
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default compose(
    withAuth,
    withRouter,
    withStyles(styles),
)(Home);