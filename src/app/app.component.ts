import { Component, OnInit, OnDestroy} from '@angular/core';
import { LibService } from './services/lib.service';
import { Observable, Subject, combineLatest } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, map
} from 'rxjs/operators';
import { Filter } from './models/filter';
import { Applet } from './models/applet';
import { LibSearchResult } from './models/lib-search-result';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  private currentCategoryName: string | null;
  private searchTextSubject = new Subject<string>();
  private currentCategorySubject = new Subject<string>();

  searchText$ : Observable<string>;
  category$ : Observable<string>;
  currentCategory : string;
  visibleCategories: KeyValue<string, number>[]
  visibleAppletNames: string[] = [];

  constructor(private libService: LibService) {
  }

  ngOnDestroy(): void {
    //not really need unsubscribe since the subscription will gone with this component
  }

  searchTextChanged(searchText: string) {
    this.searchTextSubject.next(searchText);
  }

  selectedCategory(categoryName: string) {
      this.currentCategorySubject.next(categoryName);
  }

  ngOnInit(): void {
    this.searchText$ = this.searchTextSubject.pipe(
      debounceTime(200),
      distinctUntilChanged()
    )

    this.category$ = this.currentCategorySubject.pipe(
      debounceTime(200),
      distinctUntilChanged()
    );

    let filter$ = combineLatest( this.searchText$,  this.category$,
      (searchText, category) => new Filter( searchText, category))
    .pipe(
      debounceTime(200),
      map( (filter: Filter) => this.libService.search(filter))

    );

    filter$.subscribe( libSearchResult => this.show(libSearchResult) )

    this.searchTextChanged(null);
    this.selectedCategory(null)
  }


  private show(libSearchResult: LibSearchResult) {
    this.currentCategory = libSearchResult.filter.categoryName;
    this.visibleCategories = libSearchResult.categoriesWithCount;
    this.visibleAppletNames = libSearchResult.applets.map(a => a.name);
  }

}
