import { GraphQLObjectType, GraphQLList, GraphQLString } from 'graphql';
import { PrismaClient } from '@prisma/client';

import { MemberType } from './memberType.js';
import { UserType } from './userType.js';
import { ProfileType } from './profileType.js';
import { PostType } from './postType.js';

export interface Context {
  prisma: PrismaClient;
}

export const Queries = new GraphQLObjectType({
  name: 'Queries',
  fields: {
    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async (parent, args, { prisma }: Context) => prisma.profile.findMany(),
    },
    profile: {
      type: ProfileType,
      args: { id: { type: GraphQLString } },
      resolve: async (parent, { id }: { id: string }, { prisma }: Context) =>
        prisma.profile.findUnique({ where: { id } }),
    },
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
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (parent, args, { prisma }: Context) => prisma.post.findMany(),
    },
    post: {
      type: PostType,
      args: { id: { type: GraphQLString } },
      resolve: async (parent, { id }: { id: string }, { prisma }: Context) => prisma.post.findUnique({ where: { id }}),
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: async (parent, args, { prisma }: Context) => prisma.user.findMany(),
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      resolve: async (parent, { id }: { id: string }, { prisma }: Context) =>
        prisma.user.findUnique({ where: { id } }),
    },
  },
});
