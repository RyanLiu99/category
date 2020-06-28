import { Applet } from './applet';
import { KeyValue } from '@angular/common';
import { Filter } from './filter';

export class LibSearchResult {

  constructor(public applets: Applet[],
    public categoriesWithCount: KeyValue<string, number>[],
    public filter: Filter) {
    }

}
