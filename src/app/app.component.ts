import { Component } from '@angular/core';
import { Library } from './models/library';
import { LibService } from './services/lib.service';
import { Category } from './models/category';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private _searchText: string;

  get searchText(): string {
    return this._searchText;
  }
  set searchText(value: string) {
    this._searchText = value;
  }

  lib: Library;
  visibleCategories: Category[];

  constructor(libService: LibService) {
    this.lib = libService.getLibrary();
    this.search();
  }

  private search(){
     this.visibleCategories = this.lib.categories.map(c => new Category(c));
  }
}
