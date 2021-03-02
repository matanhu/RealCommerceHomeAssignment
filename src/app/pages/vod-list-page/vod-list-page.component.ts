import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { getViewAsList, getVodFilteredAndSortTagByType } from 'src/app/app-state';
import { VodEntity } from 'src/app/app-state/entities/vod.entity';
import * as Actions from '../../app-state/actions';


@Component({
  selector: 'app-vod-list-page',
  templateUrl: './vod-list-page.component.html',
  styleUrls: ['./vod-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VodListPageComponent implements OnInit {
  public vodList = new Observable<Array<VodEntity>>();
  public viewAsList = new Observable<boolean>();
  public editItem: {index: number | null, value: string} = { 
    index: null,
    value: ''
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private readonly store: Store
  ) { }

  ngOnInit(): void {
    this.vodList = this.route.params.pipe(
      switchMap(param => {
        return this.store.select(state => getVodFilteredAndSortTagByType(state, { refType: param.type.toLowerCase()}));
    }));

    this.viewAsList = this.store.select(state => getViewAsList(state)); 
  }

  onErrorImageLoad(event: any): void {
    console.log(event);
  }

  onSelectEditItem(index: number, value: string): void {
    this.editItem = {
      index: index,
      value: value
    };
  }

  onBlurInput(item: VodEntity): void {
    if (this.editItem.value !== item.Title) {
      // Do API call
      const itemReq = {
        ...item,
        Title: this.editItem.value
      };
      this.store.dispatch(Actions.editVodItem({vodItem: itemReq}));
    }
    this.resetSelectedItem();
  }

  resetSelectedItem(): void {
    this.editItem = {
      index: null,
      value: ''
    };
  }

  onImgClicked(item: VodEntity): void {
    this.router.navigate(['item', item.imdbID]);
  }
}
