import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLBoolean,
  GraphQLInt,
} from 'graphql';

import { Context } from '../schema.js';
import { UUIDType } from './uuid.js';
import { MemberType } from './memberType.js';

export const ProfileType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: GraphQLString },
    userId: { type: new GraphQLNonNull(UUIDType) },
    memberType: {
      type: MemberType,
      resolve: async (parent: { memberTypeId: string }, args, context: Context) => {
        return context.prisma.memberType.findUnique({
          where: { id: parent.memberTypeId },
        });
      },
    },
  }),
});
