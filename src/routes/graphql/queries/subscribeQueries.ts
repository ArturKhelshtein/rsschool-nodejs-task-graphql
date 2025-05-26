import { GraphQLList } from 'graphql';

import { Context } from '../schema.js';
import { UserType } from '../types/userType.js';
import { UUIDType } from '../types/uuid.js';

export const subscribeQueries = {
  subscribedToUser: {
    type: new GraphQLList(UserType),
    args: { userId: { type: UUIDType } },
    resolve: async (parent, { userId }: { userId: string }, { prisma }: Context) => {
      const subscribers = await prisma.subscribersOnAuthors.findMany({
        where: { authorId: userId },
        include: { subscriber: true },
      });
      return subscribers.map((sub) => sub.subscriber);
    },
  },
  userSubscribedTo: {
    type: new GraphQLList(UserType),
    args: { userId: { type: UUIDType } },
    resolve: async (parent, { userId }: { userId: string }, { prisma }: Context) => {
      const authors = await prisma.subscribersOnAuthors.findMany({
        where: { subscriberId: userId },
        include: { author: true },
      });
      return authors.map((aut) => aut.author);
    },
  },
};
