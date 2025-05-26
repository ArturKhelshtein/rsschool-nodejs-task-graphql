import { GraphQLList } from 'graphql';

import { Context } from '../schema.js';
import { PostType } from '../types/postType.js';
import { UUIDType } from '../types/uuid.js';

export const postQueries = {
  posts: {
    type: new GraphQLList(PostType),
    resolve: async (parent, args, { prisma }: Context) => prisma.post.findMany(),
  },
  post: {
    type: PostType,
    args: { id: { type: UUIDType } },
    resolve: async (parent, { id }: { id: string }, { prisma }: Context) =>
      prisma.post.findUnique({ where: { id } }),
  },
};
