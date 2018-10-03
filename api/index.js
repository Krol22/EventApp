// for loading qraphql schema files
const graphQlFileLoader = require('./graphQLFileLoader.js');
graphQlFileLoader.init();

require('dotenv').config();

import express from 'express';
import bodyParser from 'body-parser';
import expressGraphql from 'express-graphql';
import { buildSchema } from 'graphql';

import { connectToDb } from './model/db';
import { eventResolver } from './resolver/';
const EventSchema = require('./model/Event.graphql');

const schema = buildSchema(`
    ${EventSchema}

    type Query {
        events: [Event] 
    }

    type Mutation {
        addEvent(firstName: String!, lastName: String!, email: String!, eventDate: String!): Event
    }
`);

const root = {
    events: eventResolver.getEvents.bind(eventResolver),
    addEvent: eventResolver.addEvent.bind(eventResolver)
};

export const app = express();

async function init() {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/graphql', expressGraphql({
        schema: schema,
        rootValue: root,
        graphiql: true,
        formatError: error => ({
            message: error.message,
            state: error.originalError && error.originalError.state,
            locations: error.locations,
            path: error.path,
        })
    }));

    try {
        await connectToDb();
    } catch (err) {
        console.log('Something went wrong...');
    }

    app.listen(4000, () => console.log('Server running on localhost:4000/graphql'));
}

init();