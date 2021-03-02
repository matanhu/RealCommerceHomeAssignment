import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { getVodItem } from 'src/app/app-state';
import { VodEntity } from 'src/app/app-state/entities/vod.entity';
import { Location } from '@angular/common';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemPageComponent implements OnInit {

  public vodItem = new Observable<VodEntity | undefined>();
  constructor(
    private route: ActivatedRoute,
    private readonly store: Store,
    private location: Location,

  ) { }

  ngOnInit(): void {
    this.vodItem = this.route.params.pipe(
      switchMap(param => {
        return this.store.select(state => getVodItem(state, { id: param.id}));
    }));
  }

  goBack(): void {
    this.location.back()
  }

}
