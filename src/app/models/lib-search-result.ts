import { Applet } from './applet';
import { KeyValue } from '@angular/common';

export class LibSearchResult {

  constructor(public applets: Applet[],
    public categoriesWithCount: KeyValue<string, number>[]) {
    }

}
