import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  inputs: ['categories']
})
export class CategoryListComponent implements OnInit {

  categories: Category[];
  @Output() categoryChanged = new EventEmitter<string>();
  constructor() {

  }

  ngOnInit(): void {
  }

  selectCategory(category: Category){
     this.categoryChanged.emit(category.name);
  }

}
