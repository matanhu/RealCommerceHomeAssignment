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

  // Load VOD from json file and return as Array of VodEntity after mapping
  loadVod(): Observable<Array<VodEntity>> {
    return this.httpClient.get('/assets/server/angular_Response.json').pipe(
      map((res: any) => {
        return res.results;
      })
    );
  }


  // Load VOD from json file and return as Array of VodEntity after mapping
  // For simulate success response of editItem - you can uncomment pipe and catchError Operator
  editVodItem(vod: any) {
    return this.httpClient.post('/editItem', vod)
    // .pipe(
    //   catchError((err) => {
    //     return of(true);
    //   })
    // );
  }
}
