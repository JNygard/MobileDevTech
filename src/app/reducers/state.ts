import { TechModel } from 'app/models';
import { CategoryModel } from 'app/models';
import { SectionModel } from 'app/models';
import { BlogPostModel } from 'app/models';

export interface RootState {
  techs: RootState.TechState;
  categories: RootState.CategoryState;
  sections: RootState.SectionState;
  ui: RootState.UIstate;
  blogPosts: RootState.BlogPostState;
  router?: any;
}

export namespace RootState {
  export type TechState = TechModel[];
  export type CategoryState = CategoryModel[];
  export type SectionState = SectionModel[];
  export type UIstate = any;
  export type BlogPostState = BlogPostModel[];
}
