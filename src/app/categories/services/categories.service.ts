import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from 'src/core/configuration';
import { categoryItem } from '../interfaces/categories.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<any> {
    return this.http.get<any>(`${Configuration.ApiUrl}/api/v1/categories`);
  }

  createNewCategory(category: categoryItem) {
    return this.http.post(
      `${Configuration.ApiUrl}/api/v1/categories`,
      category
    );
  }

  deleteCategoryById(id: string) {
    return this.http.delete<any>(
      `${Configuration.ApiUrl}/api/v1/categories/${id}`
    );
  }
}
