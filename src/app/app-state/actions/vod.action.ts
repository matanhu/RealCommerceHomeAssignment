import { Update } from '@ngrx/entity';
import { createAction, props } from '@ngrx/store';
import { VodEntity } from '../entities/vod.entity';

const LOAD_VOD = '[VOD] Load VOD';
const LOAD_VOD_SUCCESS = '[VOD] Load VOD Success';
const LOAD_VOD_FAILURE = '[VOD] Load VOD Failure';


const EDIT_VOD_ITEM = '[VOD] Edit VOD Item';
const EDIT_VOD_ITEM_SUCCESS = '[VOD] Edit VOD Item Success';
const EDIT_VOD_ITEM_FAILURE = '[VOD] Edit VOD Item Failure';

const TOGGLE_LIST_VIEW_TYPE = '[LIST VIEW] Toggle List View Type';

const ON_FILTER_VALUE_CHANGED = '[FILTER] On Filter Value Changed';

const ON_SORT_CHANGED = '[SORT] On Sort Changed';

export const loadVod = createAction(
    LOAD_VOD
);
export const loadVodSuccess = createAction(
    LOAD_VOD_SUCCESS,
    props<{vod: Array<VodEntity>}>()
);
export const loadVodFailure = createAction(
    LOAD_VOD_FAILURE
);


export const editVodItem = createAction(
    EDIT_VOD_ITEM,
    props<{vodItem: VodEntity}>()
);
export const editVodItemSuccess = createAction(
    EDIT_VOD_ITEM_SUCCESS,
    props<{update: Update<VodEntity>}>()
);
export const editVodItemFailure = createAction(
    EDIT_VOD_ITEM_FAILURE
);

export const toggleListViewType = createAction(
    TOGGLE_LIST_VIEW_TYPE
);

export const onFilterValueChanged = createAction(
    ON_FILTER_VALUE_CHANGED,
    props<{filterValue: string}>()
)

export const onSortChanged = createAction(
    ON_SORT_CHANGED
)