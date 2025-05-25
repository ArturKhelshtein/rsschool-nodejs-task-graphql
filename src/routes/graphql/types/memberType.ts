import { GraphQLObjectType, GraphQLNonNull, GraphQLInt, GraphQLEnumType, GraphQLFloat } from 'graphql';

export const MemberType = new GraphQLObjectType({
  name: 'MemberType',
  fields: () => ({
    id: { type: new GraphQLNonNull(MemberTypeId) },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
  }),
});

export const MemberTypeId = new GraphQLEnumType({
    name: 'memberTypeId',
    values: {
      BASIC: { value: 'BASIC' },
      BUSINESS: { value: 'BUSINESS' },
    },
  });