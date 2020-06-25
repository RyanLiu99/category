import { Injectable } from '@angular/core';
import { Library } from '../models/library';

@Injectable({
  providedIn: 'root'
})
export class LibService {
  constructor() { }

  getLibrary(): Library {
    let lib = new Library();
    this.addBigData(lib, 100, 5000);
    return lib;
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
