import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { TechActions } from 'app/actions/techs';
import { TechModel } from 'app/models';

const initialState: RootState.TechState = [];

export const techReducer = handleActions<RootState.TechState, TechModel[]>(
  {
    [TechActions.Type.INIT_TECHS]: (state, action: any) => {
      // console.log(action)
      if (action.payload) {
        return action.payload as TechModel[]
      }
      return state;
    }
  },
  initialState
);

