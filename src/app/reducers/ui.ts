import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { UIactions } from 'app/actions/ui';

const initialState: RootState.UIstate = {view: 0};

export const uiReducer = handleActions<RootState.UIstate, any>(
  {
    [UIactions.Type.TOGGLE_LISTVIEW]: (state, action: any) => {
      return {view: +(action.payload)};
    }
  },
  initialState
);
