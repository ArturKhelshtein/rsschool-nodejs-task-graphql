import { GraphQLNonNull, GraphQLString, GraphQLBoolean } from 'graphql';

import { Context } from '../schema.js';
import { CreatePost, DeletePost, UpdatePost } from '../types/argTypes.js';
import { UUIDType } from '../types/uuid.js';
import { PostType } from '../types/postType.js';

export const postMutations = {
  createPost: {
    type: PostType,
    args: {
      title: { type: new GraphQLNonNull(GraphQLString) },
      content: { type: new GraphQLNonNull(GraphQLString) },
      authorId: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (parent, args: CreatePost, { prisma }: Context) => {
      const { title, content, authorId } = args;

      const newPost = await prisma.post.create({
        data: {
          title,
          content,
          authorId,
        },
      });

      return {
        id: newPost.id,
        title: newPost.title,
        content: newPost.content,
        authorId: newPost.authorId,
      };
    },
  },
  updatePost: {
    type: PostType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      title: { type: GraphQLString },
      content: { type: GraphQLString },
      authorId: { type: UUIDType },
    },
    resolve: async (parent, args: UpdatePost, { prisma }: Context) => {
      const { id, ...data } = args;

      const updatedPost = await prisma.post.update({
        where: { id },
        data,
      });

      return updatedPost;
    },
  },
  deletePost: {
    type: GraphQLBoolean,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
    },
    resolve: async (parent, args: DeletePost, { prisma }: Context): Promise<boolean> => {
      await prisma.post.delete({
        where: { id: args.id },
      });

      return true;
    },
  },
};
