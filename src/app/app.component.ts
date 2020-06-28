import { Component, OnInit} from '@angular/core';
import { LibService } from './services/lib.service';
import { Category } from './models/category';
import { Observable, Subject, combineLatest } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, map
} from 'rxjs/operators';
import { Filter } from './models/filter';
import { Applet } from './models/applet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private currentCategoryName: string | null;
  private searchTextSubject = new Subject<string>();
  private currentCategorySubject = new Subject<string>();

  searchText$ : Observable<string>;
  category$ : Observable<string>;
  visibleCategories: Category[] = [];
  visibleAppletNames: string[] = [];

  constructor(private libService: LibService) {
  }

  searchTextChanged(searchText: string) {
    this.searchTextSubject.next(searchText);
  }

  selectedCategory(categoryName: string) {
      this.currentCategorySubject.next(categoryName);
  }

  ngOnInit(): void {

    this.searchText$ = this.searchTextSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    )

    this.category$ = this.searchTextSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    );

    let filter$ = combineLatest( this.searchText$,  this.category$,
      (searchText, category) => new Filter( searchText, category))
    .pipe(
      debounceTime(300),
      map( (filter: Filter) => this.search(filter))

    );

    filter$.subscribe( applets => this.showApplets(applets) )

    this.searchTextChanged(null);
    this.selectedCategory(null)

  }


  private search(filter: Filter) : Applet[]{
    console.log("search", filter);
     return this.libService.search(filter);
  }

  private showApplets(applets : Applet[]) {
    console.log("showApplets", applets);
    this.visibleCategories = [];
    this.visibleAppletNames = applets.map(a => a.name);
  }
}
