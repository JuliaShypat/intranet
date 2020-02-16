import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../_interfaces_/category.interface';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  @Input() public category: Category;
  constructor() {}

  ngOnInit() {}
}
