import { createAction } from 'redux-actions';
import { SectionModel } from 'app/models';

export namespace SectionActions {
  export enum Type {
    INIT_SECTIONS = 'INIT_SECTIONS',
  }
  export const initSections = createAction<PartialPick<SectionModel[], 'length'>>(Type.INIT_SECTIONS);
}

export type SectionActions = Omit<typeof SectionActions, 'Type'>;

