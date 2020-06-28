import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Category } from 'src/app/models/category';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  inputs: ['categories']
})
export class CategoryListComponent implements OnInit {

  categories: KeyValue<string, number>[];
  @Output() categoryChanged = new EventEmitter<string>();
  constructor() {

  }

  ngOnInit(): void {
  }

  selectCategory(category: KeyValue<string, number>){
     this.categoryChanged.emit(category.key);
  }

}
