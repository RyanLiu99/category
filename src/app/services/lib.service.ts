import { Injectable } from '@angular/core';
import { Library } from '../models/library';
import { Filter } from '../models/filter';
import { Applet } from '../models/applet';
import { LibSearchResult } from '../models/lib-search-result';
import { KeyValue } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LibService {
  private lib: Library;

  //caching for better performance. Now just cache last search term, we can cache few if needed
  private filteredAgainstSearchTermResult: Applet[];
  private lastSearchTerm: string;

  constructor() {
    this.lib = {
      categories: [
        'Performance', 'Investments', 'Operations'
      ],
      applets: [
        {
          name: 'Performance Snapshot',
          categories: ['Performance']
        },
        {
          name: 'Commitment Widget',
          categories: ['Investments']
        },
        {
          name: 'CMS',
          categories: ['Investments', 'Performance']
        }
      ]
    };

    //this.addBigData(this.lib, 100, 5000);
  }

  //It can also return Observable<> or Promise<> if search is done on server side
  search(filter: Filter): LibSearchResult {
    let applets = this.filterBySearchTerm(filter.searchText);
    let categories = this.countForCategories(applets);

    if(!!filter.searchText) {
      categories = this.removeEmptyCategories(categories);
    }

    if (!!filter.categoryName) {
      applets = applets.filter( a => a.categories.indexOf(filter.categoryName) != -1)
    }

    // categories.sort((kv1, kv2) => {
    //   if (kv1.key > kv2.key) return 1;
    //   else if (kv1.key < kv2.key) return -1;
    //   else return 0;
    // });
    return new LibSearchResult(applets, categories);
  }


  private removeEmptyCategories(categories: KeyValue<string, number>[]) : KeyValue<string, number>[] {
    return categories.filter(c => c.value > 0);
  }

  private filterBySearchTerm(searchText: string): Applet[] {
    //cached, used that
    if (!!this.filteredAgainstSearchTermResult && !!searchText && this.lastSearchTerm === searchText) {
      console.log("cache used");
      return this.filteredAgainstSearchTermResult;
    }

    if (!searchText) {
      return this.lib.applets;
    } else {
      //put in cache
      this.lastSearchTerm = searchText;
      this.filteredAgainstSearchTermResult = this.lib.applets
      .filter(a => a.name.toLowerCase().indexOf(searchText) !== -1);
      return this.filteredAgainstSearchTermResult;
    }
  }

  private countForCategories(applets: Applet[]): KeyValue<string, number>[] {
    const result = this.lib.categories.map(
      categoryName => { return { key: categoryName, value: 0 } });

    applets.forEach(applet => {
      applet.categories.forEach(categoryName => {
        let kv = result.find((kv) => kv.key == categoryName);
        if (!!kv) {
          kv.value = kv.value + 1;
        } else {
          result.push({ key: categoryName, value: 1 });
          console.error(`Find unknown category ${categoryName} for applet ${applet.name}`);
        }
      })
    })

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
