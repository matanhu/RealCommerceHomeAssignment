import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as fromRoot from '../../app-state';
import * as Actions from '../../app-state/actions';

@Component({
  selector: 'app-search-layout',
  templateUrl: './search-layout.component.html',
  styleUrls: ['./search-layout.component.scss']
})
export class SearchLayoutComponent implements OnInit, OnDestroy {

  private destroyed$ = new Subject<boolean>();
  public navbarMap = new Map<string, number>();
  public isAsc: Observable<boolean>;
  public isViewAsList: Observable<boolean>;

  constructor(private router: Router, private readonly store: Store) {
    this.initMenu();
    this.isAsc = this.store.select(state => fromRoot.getSortAsc(state));
    this.isViewAsList = this.store.select(state => fromRoot.getViewAsList(state));
  }

  ngOnInit(): void {
    this.loadVod();
  }

  loadVod(): void {
    this.store.dispatch(Actions.loadVod());
  }

  initMenu(): void {
    this.store.select(fromRoot.getVod).pipe(
      takeUntil(this.destroyed$)
    ).subscribe(data => {
      this.navbarMap = new Map<string, number>();
      data.forEach(item => {
        if(!this.navbarMap.has(item.Type)) {
          this.navbarMap.set(item.Type, 1);
        } else {
          let newCount = this.navbarMap.get(item.Type) as number + 1;
          this.navbarMap.set(item.Type, newCount);
        }
      })
    });
  }

  changeView(): void {
    this.store.dispatch(Actions.toggleListViewType());
  }

  changeSort(): void {
    this.store.dispatch(Actions.onSortChanged());
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

}
