import { Component, EventEmitter, Output } from '@angular/core';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  inputs: ['categories']
})
export class CategoryListComponent {

  categories: KeyValue<string, number>[];
  @Output() categoryChanged = new EventEmitter<string>();
  constructor() {

  }

  selectCategory(category: KeyValue<string, number>){
     this.categoryChanged.emit(category.key);
  }

}
