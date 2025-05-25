import { GraphQLObjectType } from 'graphql';
import { userMutations } from './mutations/userMutations.js';
import { profileMutations } from './mutations/profileMutations.js';
import { postMutations } from './mutations/postMutations.js';

export const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
      ...profileMutations,
      ...postMutations,
      ...userMutations
  },
});
