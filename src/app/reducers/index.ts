import { combineReducers } from 'redux';
import { RootState } from './state';
import { techReducer } from './techs';
import { categoryReducer } from './categories';
import { sectionReducer } from './sections';
import { uiReducer } from './ui';
import { blogPostReducer } from './blogPosts';

export { RootState };

export const rootReducer = combineReducers<RootState>({
    techs: techReducer as any,
    categories: categoryReducer as any,
    sections: sectionReducer as any,
    ui: uiReducer as any,
    blogPosts: blogPostReducer as any,
});

