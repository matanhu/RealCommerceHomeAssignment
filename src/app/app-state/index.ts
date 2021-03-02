import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store';
//   import { localStorageSync } from 'ngrx-store-localstorage';
import { environment } from '../../environments/environment';
import { getDateFromString } from '../pipes/format-date.pipe';
import { VodEntity } from './entities/vod.entity';
import * as fromVod from './reducers/vod.reducer';
import { formatDate } from '@angular/common';
import { Dictionary } from '@ngrx/entity';




export interface State {
    vod: fromVod.VodState;
}

export const reducers: ActionReducerMap<State> = {
    vod: fromVod.reducer,
};

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
)

export const getVodItem = createSelector(
    getVodEntities,
    (entities: Dictionary<VodEntity>, props: {id: string}) => {
        return entities[props.id];
    }
)

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

export const getViewAsList = createSelector(
    getVodState,
    (state) => state.viewAsList
)

export const getSortAsc = createSelector(
    getVodState,
    (state) => state.sortAsc
)