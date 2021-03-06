# Ryan Liu

Running at https://category.stackblitz.io/

## Performance Consideration

* Uses RxJs functions like

  * debounceTime
  * distinctUntilChanged
  * combineLatest

to reduce unnecessary repetitive search.

* Cache filter result based on search term, so when the user clicks around at category, no need filter by search term again.  I assume the user will be changing category more often than changing search term.

* If needed, the pagination can be used to improve performance, esp rendering.

It preforms very well on my local machine for 100 categories and 5000 applets.

## Case-insensitive and partial search

It is implemented so that search term is case-insensitive and it will return any applet whose name contains the search term.

## Bug in addBigData()

 I improved addBigData() method, to avoid adding duplicated category name into one applet.

## UI: Category and Applets stay in sync

A category will not be highlighted until search is done. This is to avoid the case while filtering data, the current category and applets are out of sync.

### UI: Suggestions

* Add a "x" badge to remove search term.
* Add button to remove category filter. E.g. "All Categories" at the top.
