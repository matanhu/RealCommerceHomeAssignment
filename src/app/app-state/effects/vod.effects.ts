import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { VodService } from "src/app/services/vod.service";
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from "rxjs";

import * as vodActions from '../actions';

/*
  Listen to Action of NGRX and do Side Effects
*/ 

@Injectable()
export class VodEffects {

  constructor(
    private actions$: Actions,
    private vodService: VodService
  ) { }

  /*
    Side Effect of loadVod action
    Load data from server,
    On Success dispatch loadVodSuccess action
    On Failure dispatch loadVodFailure action
  */ 
  loadVod$ = createEffect(() =>
    this.actions$.pipe(
      ofType(vodActions.loadVod),
      exhaustMap(action =>
        this.vodService.loadVod().pipe(
          map(response => {
            console.log("response:::", response)
            return vodActions.loadVodSuccess({ vod: response })
          }),
          catchError((error: any) => of(vodActions.loadVodFailure())))
      )
    )
  );

  /*
    Side Effect of editVodItem action
    Load data from server,
    On Success dispatch editVodItemSuccess action
    On Failure dispatch editVodItemFailure action
  */ 
  editVodItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(vodActions.editVodItem),
      exhaustMap(action =>
        this.vodService.editVodItem(action.vodItem).pipe(
          map(response => vodActions.editVodItemSuccess({ update: { id: action.vodItem.imdbID, changes: action.vodItem } })),
          catchError((error: any) => of(vodActions.editVodItemFailure())))
      )
    )
  );
}