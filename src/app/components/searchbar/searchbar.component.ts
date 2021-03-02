import { AfterViewInit, ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import * as Actions from '../../app-state/actions';


@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchbarComponent implements OnInit, AfterViewInit {

  @ViewChild('searchInput', { static: true })
  searchInput!: ElementRef;

  constructor(
    private readonly store: Store
  ) { }

  ngOnInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      // get value
      map((event: any) => {
        return event.target.value;
      }),
      // Time in milliseconds between key events
      debounceTime(1000),
      // If previous query is diffent from current   
      distinctUntilChanged()).subscribe((filterValue: string) =>  {
        this.store.dispatch(Actions.onFilterValueChanged({filterValue}));
      });
  }


  ngAfterViewInit(): void {
    
  }

  clearInput() {
    this.searchInput.nativeElement.value = '';
    this.store.dispatch(Actions.onFilterValueChanged({filterValue: ''}));
  }

}
