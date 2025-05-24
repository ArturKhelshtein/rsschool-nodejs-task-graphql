import { GraphQLObjectType, GraphQLNonNull, GraphQLFloat, GraphQLString, GraphQLList } from 'graphql';
import { UUIDType } from './uuid.js';
import { Context } from './queries.js';
import { User } from '@prisma/client';

export const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    subscribedToUser: { 
      type: new GraphQLList(UserType),
      resolve: async (parent: User, args, { prisma }: Context): Promise <User[] | []> => {
        const authors = await prisma.subscribersOnAuthors.findMany({
          where: { subscriberId: parent.id },
          include: { author: true },
        });
        return authors.map(author => author.author);
      }
    },
    userSubscribedTo: { 
      type: new GraphQLList(UserType),
      resolve: async (parent: User, args, { prisma }: Context): Promise <User[] | []> => {
        const subscribers = await prisma.subscribersOnAuthors.findMany({
          where: { authorId: parent.id },
          include: { subscriber: true },
        });
        return subscribers.map(subscriber => subscriber.subscriber);
      }
    },
  }),
});
