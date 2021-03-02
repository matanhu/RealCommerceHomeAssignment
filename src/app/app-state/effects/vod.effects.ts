import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { VodService } from "src/app/services/vod.service";
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from "rxjs";

import * as vodActions from '../actions';



@Injectable()
export class VodEffects {

  constructor(
    private actions$: Actions,
    private vodService: VodService
  ) { }

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