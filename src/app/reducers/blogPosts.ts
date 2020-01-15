import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { BlogPostActions } from 'app/actions/blogPosts';
import { BlogPostModel } from 'app/models';

const initialState: RootState.BlogPostState = [];

export const blogPostReducer = handleActions<RootState.BlogPostState, BlogPostModel[]>(
  {
    [BlogPostActions.Type.INIT_POSTS]: (state, action: any) => {
      // console.log(action)
      if (action.payload) {
        return action.payload as BlogPostModel[];
      }
      return state;
    }
  },
  initialState
);

