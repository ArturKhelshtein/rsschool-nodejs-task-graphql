import { GraphQLList } from 'graphql';

import { Context } from '../schema.js';
import { UserType } from '../types/userType.js';
import { PostType } from '../types/postType.js';
import { UUIDType } from '../types/uuid.js';

export const userQueries = {
  users: {
    type: new GraphQLList(UserType),
    resolve: async (parent, args, { prisma }: Context) => prisma.user.findMany(),
  },
  user: {
    type: UserType,
    args: { id: { type: UUIDType } },
    resolve: async (parent, { id }: { id: string }, { prisma }: Context) =>
      prisma.user.findUnique({ where: { id } }),
  },
  userPosts: {
    type: new GraphQLList(PostType),
    args: { userId: { type: UUIDType } },
    resolve: async (parent, { userId }: { userId: string }, { prisma }: Context) =>
      prisma.post.findMany({ where: { authorId: userId } }),
  },
};
