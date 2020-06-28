export class Filter{

  constructor(public searchText : string | null, public  categoryName: string| null) {
    this.searchText = searchText?.trim();
  }
}
