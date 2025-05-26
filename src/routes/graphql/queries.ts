import { GraphQLObjectType } from 'graphql';

import { profileQueries } from './queries/profileQueries.js';
import { memberTypesQueries } from './queries/memberTypesQueries.js';
import { postQueries } from './queries/postQueries.js';
import { userQueries } from './queries/userQueries.js';
import { subscribeQueries } from './queries/subscribeQueries.js';

export const Queries = new GraphQLObjectType({
  name: 'Queries',
  fields: {
    ...profileQueries,
    ...memberTypesQueries,
    ...postQueries,
    ...userQueries,
    ...subscribeQueries,
  },
});
