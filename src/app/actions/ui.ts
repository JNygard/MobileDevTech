import { createAction } from 'redux-actions';

export namespace UIactions {
  export enum Type {
    TOGGLE_LISTVIEW = 'TOGGLE_LISTVIEW',
  }
  export const setListView = createAction<PartialPick<string, 'length'>>(Type.TOGGLE_LISTVIEW);


}
export type UIactions = Omit<typeof UIactions, 'Type'>;
