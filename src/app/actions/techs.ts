import { createAction } from 'redux-actions';
import { TechModel } from 'app/models';

export namespace TechActions {
  export enum Type {
    ADD_TECH = 'ADD_TECH',
    INIT_TECHS = 'INIT_TECHS'
  }

  export const addTech = createAction<PartialPick<TechModel, 'id'>>(Type.ADD_TECH);
  export const initTechs = createAction<PartialPick<TechModel[], 'length'>>(Type.INIT_TECHS);

}

export type TechActions = Omit<typeof TechActions, 'Type'>;
