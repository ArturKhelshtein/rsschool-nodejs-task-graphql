import { GraphQLNonNull, GraphQLBoolean } from 'graphql';

import { Context } from '../schema.js';
import { CreatePost, DeletePost, ChangePost } from '../types/argTypes.js';
import { UUIDType } from '../types/uuid.js';
import { PostType } from '../types/postType.js';
import { CreatePostInput } from '../types/createPostInput.js';
import { ChangePostInput } from '../types/changePostInput.js';

export const postMutations = {
  createPost: {
    type: PostType,
    args: {
      dto: { type: CreatePostInput },
    },
    resolve: async (parent, args: CreatePost, { prisma }: Context) => {
      const { title, content, authorId } = args.dto;

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
  changePost: {
    type: PostType,
    args: {
      id: { type: new GraphQLNonNull(UUIDType) },
      dto: {
        type: new GraphQLNonNull(ChangePostInput),
      },
    },
    resolve: async (parent, args: ChangePost, { prisma }: Context) => {
      const { id, dto } = args;

      const updatedPost = await prisma.post.update({
        where: { id },
        data: dto,
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
