import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLString,
  GraphQLList,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { Context } from '../schema.js';
import { User } from '@prisma/client';
import { ProfileType } from './profileType.js';
import { PostType } from './postType.js';

export const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: 'UserType',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: ProfileType,
      resolve: async (parent: User, args, { prisma }: Context) => {
        return prisma.profile.findUnique({
          where: { userId: parent.id },
        });
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (parent: User, args, { prisma }: Context) => {
        return prisma.post.findMany({
          where: { authorId: parent.id },
        });
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (parent: User, args, { prisma }: Context) => {
        const authors = await prisma.subscribersOnAuthors.findMany({
          where: { subscriberId: parent.id },
          include: { author: true },
        });
        return authors.map((author) => author.author);
      },
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (parent: User, args, { prisma }: Context) => {
        const subscribers = await prisma.subscribersOnAuthors.findMany({
          where: { authorId: parent.id },
          include: { subscriber: true },
        });
        return subscribers.map((subscriber) => subscriber.subscriber);
      },
    },
  }),
});
