import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { getDateFromString } from '../pipes/format-date.pipe';
import { VodEntity } from './entities/vod.entity';
import { formatDate } from '@angular/common';
import { Dictionary } from '@ngrx/entity';
import * as fromVod from './reducers/vod.reducer';


// State Interface
export interface State {
    vod: fromVod.VodState;
}

export const reducers: ActionReducerMap<State> = {
    vod: fromVod.reducer,
};

// On Debug log each action to console and current state before create reducer
export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
    return function (state, action) {
        console.log('state', state);
        console.log('action', action);

        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [debug] : [];

// Vod Selectors
export const getVodState = createFeatureSelector<fromVod.VodState>('vod');

export const getVod = createSelector(
    getVodState,
    fromVod.selectAll
);

export const getVodEntities = createSelector(
    getVodState,
    fromVod.selectEntities
);

// Select VodItem by imdbID from NGRX Entiry 
export const getVodItem = createSelector(
    getVodEntities,
    (entities: Dictionary<VodEntity>, props: {id: string}) => {
        return entities[props.id];
    }
);

/* 
    Selector of Vod by Tag input 
    the return will be sorted by sortAsc on State and filtered by filterValue on State
*/
export const getVodFilteredAndSortTagByType = createSelector(
    getVodState,
    getVod,
    (state: fromVod.VodState, entities: Array<VodEntity>, props: { refType: string}) => {
        let res = new Array<VodEntity>();
        res = entities.filter(item => item.Type === props.refType);
        if (state.filterValue) {
            
            res = res.filter(item => {
                const date = getDateFromString(item.Year);
                let dateString = '';
                if (date) {
                    dateString = formatDate(date, 'dd-MM-yyyy', 'en-US');
                }
                return item.Title.indexOf(state.filterValue) > -1 ||  dateString.indexOf(state.filterValue) > -1;
            });
        }
        res = res.sort((a, b) => {
            if(state.sortAsc) {
                return a.Title.localeCompare(b.Title);
            }
            return b.Title.localeCompare(a.Title);
        })
        return res;
    }
);

// Select boolean of viewAsList on State
export const getViewAsList = createSelector(
    getVodState,
    (state) => state.viewAsList
);

// Select boolean of sortAsc on State
export const getSortAsc = createSelector(
    getVodState,
    (state) => state.sortAsc
);