import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Action, createReducer, on } from "@ngrx/store";
import * as vodActions from '../actions';
import { VodEntity } from "../entities/vod.entity";

export interface VodState extends EntityState<VodEntity> {
    filterValue: string;
    isLoading: boolean;
    isLoadingSuccess: boolean;
    viewAsList: boolean;
    sortAsc: boolean;
}

export function selectVodItemId(a: VodEntity): string {
    return a.imdbID;
}

export const vodAdapter: EntityAdapter<VodEntity> = createEntityAdapter<VodEntity>({
    selectId: selectVodItemId,
});

export const initialState: VodState = vodAdapter.getInitialState({
    filterValue: '',
    isLoading: false,
    isLoadingSuccess: false,
    viewAsList: true,
    sortAsc: true
});

const vodReducer = createReducer(
    initialState,

    // GetVod
    on(vodActions.loadVod, (state) => ({ ...state, isLoading: true })),
    on(vodActions.loadVodSuccess, (state, action) => {
        return vodAdapter.setAll(
            action.vod,
            { ...state, isLoading: false, isLoadingSuccess: true }
        );
    }),
    on(vodActions.loadVodFailure, (state) => {
        return { ...state, isLoading: false, isLoadingSuccess: false }
    }),

    // EditVodItem
    on(vodActions.editVodItem, (state) => {
        return { ...state, isLoading: true }
    }),
    on(vodActions.editVodItemSuccess, (state, action) => {
        return vodAdapter.updateOne(action.update, { ...state, isLoading: false, isLoadingSuccess: true });
    }),
    on(vodActions.editVodItemFailure, (state, action) => {
        return { ...state, isLoading: false, isLoadingSuccess: false }
    }),
    on(vodActions.toggleListViewType, (state) => {
        return { ...state, viewAsList: !state.viewAsList };
    }),

    // Filter Value Changed
    on(vodActions.onFilterValueChanged, (state, action) => {
        return { ...state, filterValue: action.filterValue };
    }),

    // Sort Changed
    on(vodActions.onSortChanged, (state) => {
        return { ...state, sortAsc: !state.sortAsc };
    })
);

export function reducer(state: VodState | undefined, action: Action): any {
    return vodReducer(state, action);
}


// get the selectors
export const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = vodAdapter.getSelectors();

