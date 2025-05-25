import { GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLBoolean } from 'graphql';

import { Context } from '../schema.js';
import { UserType } from '../types/userType.js';
import { CreateUserArgs, DeleteUserArgs, UpdateUserArgs } from '../types/argTypes.js';
import { UUIDType } from '../types/uuid.js';

export const userMutations = {
  createUser: {
    type: UserType,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      balance: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: async (parent, args: CreateUserArgs, { prisma }: Context) => {
      const newUser = await prisma.user.create({
        data: {
          name: args.name,
          balance: args.balance,
        },
      });

      return {
        id: newUser.id,
        name: newUser.name,
        balance: newUser.balance,
      };
    },
  },
  updateUser: {
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      name: { type: GraphQLString },
      balance: { type: GraphQLInt },
    },
    resolve: async (parent, args: UpdateUserArgs, { prisma }: Context) => {
      const { id, ...data } = args;

      return prisma.user.update({
        where: { id },
        data,
      });
    },
  },
  deleteUserType: {
    type: GraphQLBoolean,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (
      parent,
      args: DeleteUserArgs,
      { prisma }: Context,
    ): Promise<boolean> => {
      await prisma.user.delete({
        where: { id: args.id },
      });

      return true;
    },
  },
};
