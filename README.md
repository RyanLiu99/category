# Ryan Liu

## Performance Consideration

* Uses RxJs functions like

  * debounceTime
  * distinctUntilChanged
  * combineLatest

to reduce unnecessary search.

* Cache filter result based on search term, so when user click around category, no need filter by search term anymore.  I assume the user will be changing category more often than changing search term.

It preforms very well on my local machine for 100 categories and 5000 applets.

## Case-insensitive and partial search

It is implemented so that search term is case-insensitive and it will return any applet whose name contains the search term.

## Bug in addBigData()

 I improved addBigData() method, to avoid adding duplicated category name into one applet.

## UI: Category and Applets stay in sync

A category will not be highlighted until search is done. This is to avoid while filtering data, the current category and applets are out of sync.

### UI: suggestions

* Add a "x" badge to remove search term.
* Add button to remove category filter. E.g. "All Categories" at the top.
