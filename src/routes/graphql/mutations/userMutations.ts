import { GraphQLNonNull, GraphQLBoolean } from 'graphql';
import { Context } from '../schema.js';
import { UserType } from '../types/userType.js';
import { CreateUserArgs, DeleteUserArgs, ChangeUserArgs } from '../types/argTypes.js';
import { UUIDType } from '../types/uuid.js';
import { CreateUserInput } from '../types/createUserInput.js';
import { ChangeUserInput } from '../types/changeUserInput.js';

export const userMutations = {
  createUser: {
    type: UserType,
    args: {
      dto: { type: CreateUserInput },
    },
    resolve: async (parent, args: CreateUserArgs, { prisma }: Context) => {
      const { name, balance } = args.dto;

      const newUser = await prisma.user.create({
        data: {
          name,
          balance,
        },
      });

      return {
        id: newUser.id,
        name: newUser.name,
        balance: newUser.balance,
      };
    },
  },
  changeUser: {
    type: UserType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: {
        type: new GraphQLNonNull(ChangeUserInput),
      },
    },
    resolve: async (parent, args: ChangeUserArgs, { prisma }: Context) => {
      const { id, dto } = args;

      return prisma.user.update({
        where: { id },
        data: dto,
      });
    },
  },
  deleteUser: {
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
