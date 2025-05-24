import { GraphQLSchema } from 'graphql';
import { Queries } from './types/queries.js';

export const schema = new GraphQLSchema({
  query: Queries,
});
