import { GraphQLList, GraphQLString } from 'graphql';

import { Context } from '../schema.js';
import { MemberType } from '../types/memberType.js';

export const memberTypesQueries = {
  memberTypes: {
    type: new GraphQLList(MemberType),
    resolve: async (parent, args, { prisma }: Context) => prisma.memberType.findMany(),
  },
  memberType: {
    type: MemberType,
    args: { id: { type: GraphQLString } },
    resolve: async (parent, { id }: { id: string }, { prisma }: Context) =>
      prisma.memberType.findUnique({ where: { id } }),
  },
};
