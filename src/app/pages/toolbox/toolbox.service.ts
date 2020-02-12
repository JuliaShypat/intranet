import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Category } from './_interfaces_/category.interface';

@Injectable({
  providedIn: 'root'
})
export class ToolboxService {
  constructor(private httpClient: HttpClient) {}

  public getCategoriesList(): Observable<Array<Category>> {
    const url = 'assets/data/links.json';
    return this.httpClient.get<Array<Category>>(url);
  }
}
