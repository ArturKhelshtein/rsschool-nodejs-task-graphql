import { GraphQLNonNull, GraphQLInt, GraphQLBoolean } from 'graphql';

import { Context } from '../schema.js';
import { CreateProfile, DeleteProfile, UpdateProfile } from '../types/argTypes.js';
import { UUIDType } from '../types/uuid.js';
import { ProfileType } from '../types/profileType.js';
import { MemberTypeId } from '../types/memberType.js';

export const profileMutations = {
  createProfile: {
    type: ProfileType,
    args: {
      isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
      yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
      memberTypeId: { type: new GraphQLNonNull(MemberTypeId) },
      userId: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (parent, args: CreateProfile, { prisma }: Context) => {
      const { isMale, yearOfBirth, memberTypeId, userId } = args;

      const newProfile = await prisma.profile.create({
        data: {
          isMale,
          yearOfBirth,
          memberTypeId,
          userId,
        },
      });

      return {
        id: newProfile.id,
        isMale: newProfile.isMale,
        yearOfBirth: newProfile.yearOfBirth,
        memberTypeId: newProfile.memberTypeId,
        userId: newProfile.userId,
      };
    },
  },
  updateProfile: {
    type: ProfileType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      isMale: { type: GraphQLBoolean },
      yearOfBirth: { type: GraphQLInt },
      memberTypeId: { type: MemberTypeId },
      userId: { type: UUIDType },
    },
    resolve: async (parent, args: UpdateProfile, { prisma }: Context) => {
      const { id, ...data } = args;

      const updatedProfile = await prisma.profile.update({
        where: { id },
        data,
      });

      return updatedProfile;
    },
  },
  deleteProfile: {
    type: GraphQLBoolean,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (
      parent,
      args: DeleteProfile,
      { prisma }: Context,
    ): Promise<boolean> => {
      await prisma.profile.delete({
        where: { id: args.id },
      });

      return true;
    },
  },
};
