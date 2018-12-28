import {ApolloServer} from "apollo-server-express";
import {WebApp} from "meteor/webapp";
import merge from 'lodash/merge';
import {getUser} from 'meteor/apollo'

import ResolutionsSchema from '../../api/resolutions/Resolutions.graphql'
import ResolutionsResolvers from '../../api/resolutions/resolvers'

import UsersSchema from '../../api/users/User.graphql'
import UsersResolvers from '../../api/users/resolvers'

import GoalsSchema from '../../api/goals/Goals.graphql'
import GoalsResolvers from '../../api/goals/resolvers'

const typeDefs = [
  ResolutionsSchema,
  UsersSchema,
  GoalsSchema
];

const resolvers = merge(
  ResolutionsResolvers,
  UsersResolvers,
  GoalsResolvers
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    const currentUser = await getUser(req.headers.authorization);
    return ({
      currentUser: currentUser
    })
  }
});

server.applyMiddleware({
  app: WebApp.connectHandlers,
  path: '/graphql'
});

WebApp.connectHandlers.use('/graphql', (req, res) => {
  if (req.method === 'GET') {
    res.end()
  }
});