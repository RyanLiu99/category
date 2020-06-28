import { Injectable } from '@angular/core';
import { Library } from '../models/library';
import { Filter } from '../models/filter';
import { Observable, of } from 'rxjs';
import { Applet } from '../models/applet';

@Injectable({
  providedIn: 'root'
})
export class LibService {

  private lib: Library;

  constructor() {
    this.lib = new Library();
    this.addBigData(this.lib, 100, 5000);
  }

  //It can also return Observable<Applet[]> if search is done on server side
  search(filter: Filter): Applet[] {
    let result = this.lib.applets;
    if (!!filter.searchText) {
      result = result.filter(a => a.name.indexOf(filter.searchText) !== -1);
    }
    if (!!filter.category) {
      result = result.filter(a => a.categories.indexOf(filter.category) !== -1);
    }
    return result;
  }


  private addBigData(lib: Library, ncategs: number, napplets: number) {
    for (var i = 0; i < ncategs; i++) {
      lib.categories.push('Sample Category ' + i);
    }
    var n = lib.categories.length;
    for (var i = 0; i < napplets; i++) {
      var a = {
        name: 'CMS' + i,
        categories: []
      };
      for (var j = 0; j < Math.floor(Math.random() * 10); ++j) {
        var idx = Math.floor(Math.random() * n) % n;
        a.categories.push(lib.categories[idx]);
      }
      lib.applets.push(a);
    }
  }
}
