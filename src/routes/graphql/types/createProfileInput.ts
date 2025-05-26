import { GraphQLBoolean, GraphQLInt, GraphQLNonNull, GraphQLInputObjectType } from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberTypeId } from './memberType.js';

export const CreateProfileInput = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: {
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeId) },
    userId: { type: new GraphQLNonNull(UUIDType) },
  },
});
