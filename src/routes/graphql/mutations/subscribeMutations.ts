import { GraphQLNonNull, GraphQLBoolean, GraphQLString } from 'graphql';

import { Context } from '../schema.js';
import { CreatePost, DeletePost, ChangePost, Subscribe, Unsubscribe } from '../types/argTypes.js';
import { UUIDType } from '../types/uuid.js';
import { PostType } from '../types/postType.js';
import { CreatePostInput } from '../types/createPostInput.js';
import { ChangePostInput } from '../types/changePostInput.js';
import { UserType } from '../types/userType.js';

export const subscribeMutations = {
  subscribeTo: {
    type: new GraphQLNonNull(GraphQLString),
    args: {
      userId: { type: new GraphQLNonNull(UUIDType) },
      authorId: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (parent, args: Subscribe, { prisma }: Context) => {
      const { userId, authorId } = args;

      await prisma.subscribersOnAuthors.create({
        data: {
          subscriberId: userId,
          authorId: authorId,
        },
      });

      return 'You are subscribed'
    },
  },
  unsubscribeFrom: {
    type: new GraphQLNonNull(GraphQLString),
    args: {
      userId: { type: new GraphQLNonNull(UUIDType) },
      authorId: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (parent, args: Unsubscribe, { prisma }: Context) => {
      const { userId, authorId } = args;

      await prisma.subscribersOnAuthors.delete({
        where: {
            subscriberId_authorId: {
                subscriberId: userId,
                authorId
            }
        }
      });

      return 'You are unsubscribed'
    },
  },
};
