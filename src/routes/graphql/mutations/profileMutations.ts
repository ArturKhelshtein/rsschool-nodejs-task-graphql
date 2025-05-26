import { GraphQLNonNull, GraphQLBoolean } from 'graphql';

import { Context } from '../schema.js';
import { CreateProfile, DeleteProfile, ChangeProfile } from '../types/argTypes.js';
import { UUIDType } from '../types/uuid.js';
import { ProfileType } from '../types/profileType.js';
import { CreateProfileInput } from '../types/createProfileInput.js';
import { ChangeProfileInput } from '../types/changeProfileInput.js';

export const profileMutations = {
  createProfile: {
    type: ProfileType,
    args: {
      dto: { type: CreateProfileInput },
    },
    resolve: async (parent, args: CreateProfile, { prisma }: Context) => {
      const { isMale, yearOfBirth, memberTypeId, userId } = args.dto;

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
  changeProfile: {
    type: ProfileType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: {
        type: ChangeProfileInput,
      },
    },
    resolve: async (parent, args: ChangeProfile, { prisma }: Context) => {
      const { id, dto } = args;

      const updatedProfile = await prisma.profile.update({
        where: { id },
        data: dto,
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
