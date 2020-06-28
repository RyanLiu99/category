import { Applet } from './applet';
import { Category } from './category';
import { KeyValue } from '@angular/common';

export class LibSearchResult {

  constructor(public applets: Applet[],
    public categoriesWithCount: KeyValue<string, number>[]) {
    }

}
