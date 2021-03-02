import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { VodEntity } from '../app-state/entities/vod.entity';


@Injectable({
  providedIn: 'root'
})
export class VodService {

  constructor(
    private httpClient: HttpClient
  ) { }

  loadVod(): Observable<Array<VodEntity>> {
    return this.httpClient.get('/assets/server/angular_Response.json').pipe(
      map((res: any) => {
        return res.results;
    }));
  }

  editVodItem(vod: any) {
    return this.httpClient.post('/updateItem', vod)
    // .pipe(
    //   catchError((err) => {
    //     return of(true);
    //   })
    // );
  }
}
