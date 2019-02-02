require('dotenv').config({ path: '.env' });

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const epilogue = require('epilogue');
const OktaJwtVerifier = require('@okta/jwt-verifier');

const oktaJwtVerifier = new OktaJwtVerifier({
    clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
    issuer: `${process.env.REACT_APP_OKTA_ORG_URL}/oauth2/default`,
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(async (req, res, next) => {
    try {
        if (!req.headers.authorization) throw new Error('Authorization header is required');

        const accessToken = req.headers.authorization.trim().split(' ')[1];
        await oktaJwtVerifier.verifyAccessToken(accessToken);
        next();
    } catch (error) {
        next(error.message);
    }
});

const database = new Sequelize({
    dialect: 'sqlite',
    storage: './test.sqlite',
});

const Post = database.define('posts', {
    title: Sequelize.STRING,
    body: Sequelize.TEXT,
});




/* START item resourse added */
const Item = database.define('items', {
    title: Sequelize.STRING,
    body: Sequelize.TEXT,
});
/* END item resourse added */

/* START checklistitem resourse added */
const ChecklistItem = database.define('checklistitems', {
    body: Sequelize.TEXT,
/*     checkbox: Sequelize.BOOLEAN */
});
/* END checklistitem resourse added */




epilogue.initialize({ app, sequelize: database });

epilogue.resource({
    model: Post,
    endpoints: ['/posts', '/posts/:id'],
});




/* START item resourse added */
epilogue.resource({
    model: Item,
    endpoints: ['/items', '/items/:id'],
});
/* END item resourse added */

/* START checklistitem resourse added */
epilogue.resource({
    model: ChecklistItem,
    endpoints: ['/checklistitems', '/checklistitems/:id'],
});
/* END item resourse added */




const port = process.env.SERVER_PORT || 3001;

database.sync().then(() => {
    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
});