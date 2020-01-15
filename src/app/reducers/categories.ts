import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { CategoryActions } from 'app/actions/categories';
import { CategoryModel } from 'app/models';

const initialState: RootState.CategoryState = [];

export const categoryReducer = handleActions<RootState.CategoryState, CategoryModel[]>(
  {
    [CategoryActions.Type.INIT_CATEGORIES]: (state, action: any) => {
      // console.log(action)
      if (action.payload) {
        return action.payload as CategoryModel[];
      }
      return state;
    }
  },
  initialState
);

/*
export const categoryInitialization = (data: any) => {
  return {
    type: 'INIT_CATEGORIES',
    data
  }
}
*/

