import { createAction } from 'redux-actions';
import { CategoryModel } from 'app/models';

export namespace CategoryActions {
  export enum Type {
    INIT_CATEGORIES = 'INIT_CATEGORIES',
  }
  export const initCategories = createAction<PartialPick<CategoryModel[], 'length'>>(Type.INIT_CATEGORIES);
}

export type CategoryActions = Omit<typeof CategoryActions, 'Type'>;



