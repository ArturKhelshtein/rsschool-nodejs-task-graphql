import { GraphQLList } from 'graphql';

import { ProfileType } from '../types/profileType.js';
import { UUIDType } from '../types/uuid.js';
import { Context } from '../schema.js';

export const profileQueries = {
  profiles: {
    type: new GraphQLList(ProfileType),
    resolve: async (parent, args, { prisma }: Context) => prisma.profile.findMany(),
  },
  profile: {
    type: ProfileType,
    args: { id: { type: UUIDType } },
    resolve: async (parent, { id }: { id: string }, { prisma }: Context) =>
      prisma.profile.findUnique({ where: { id } }),
  },
};
