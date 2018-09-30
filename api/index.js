// for loading qraphql schema files
const graphQlFileLoader = require('./graphQLFileLoader.js');
graphQlFileLoader.init();

import express from 'express';
import bodyParser from 'body-parser';
import expressGraphql from 'express-graphql';
import { buildSchema } from 'graphql';
import mongoose from 'mongoose';

import { EventResolver } from './model/Event';
const EventSchema = require('./model/Event.graphql');

mongoose.connect('mongodb://localhost:27017/work', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

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
    events: EventResolver.getEvents,
    addEvent: EventResolver.addEvent
};

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/graphql', expressGraphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

db.once('open', async function () {
    app.listen(4000, () => console.log('Server running on localhost:4000/graphql'));
});
