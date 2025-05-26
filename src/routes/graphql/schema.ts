import { GraphQLSchema } from 'graphql';
import { Queries } from './queries.js';
import { Mutations } from './mutations.js';
import { PrismaClient } from '@prisma/client';

export interface Context {
  prisma: PrismaClient;
}

export const schema = new GraphQLSchema({
  query: Queries,
  mutation: Mutations,
});
