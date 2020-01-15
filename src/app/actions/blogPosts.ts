import { createAction } from 'redux-actions';
import { BlogPostModel } from 'app/models';

export namespace BlogPostActions {
  export enum Type {
    INIT_POSTS = 'INIT_POSTS',
  }
  export const initPosts = createAction<PartialPick<BlogPostModel[], 'length'>>(Type.INIT_POSTS);
}

export type BlogPostActions = Omit<typeof BlogPostActions, 'Type'>;

