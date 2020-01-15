import { handleActions } from 'redux-actions';
import { RootState } from './state';
import { SectionActions } from 'app/actions/sections';
import { SectionModel } from 'app/models';

const initialState: RootState.SectionState = [];

export const sectionReducer = handleActions<RootState.SectionState, SectionModel[]>(
  {
    [SectionActions.Type.INIT_SECTIONS]: (state, action: any) => {
      // console.log(action)
      if (action.payload) {
        return action.payload as SectionModel[];
      }
      return state;
    }
  },
  initialState
);


