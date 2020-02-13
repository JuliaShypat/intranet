import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Category } from './_interfaces_/category.interface';
import { Link } from './_interfaces_/link.interface';

@Injectable({
  providedIn: 'root'
})
export class ToolboxService {
  constructor(private httpClient: HttpClient) {}

  public getCategoriesList(): Observable<Array<Category>> {
    const url = 'assets/data/links.json';
    return this.httpClient.get<Array<Category>>(url);
  }

  public getFilteredCategories(categories: Array<Category>, substring: string): Array<Category> {
    return categories.reduce((filtered, category) => {
      if (this.isCategoryIncludeSubstring(category, substring)) {
        filtered.push(category);
      } else {
        const filteredLinks = this.getLinksIncludeSubstring(category.links, substring);
        if (filteredLinks.length > 0) {
          filtered.push({ ...category, links: filteredLinks });
        }
      }
      return filtered;
    }, []);
  }

  private isCategoryIncludeSubstring(category: Category, substring: string): boolean {
    return category.name.toLowerCase().includes(substring);
  }

  private getLinksIncludeSubstring(links: Array<Link>, substring: string): Array<Link> {
    const filteredLinks = links.filter(link => link.name.toLowerCase().includes(substring));
    return filteredLinks;
  }
}
