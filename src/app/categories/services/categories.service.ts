import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Configuration } from 'src/core/configuration';
import { CategoryItem } from '../interfaces/categories.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getAllCategories(page?: number, search?: string): Observable<any> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page.toString());
    }
    if (search) {
      params = params.append('search', search);
    }
    return this.http.get<any>(`${Configuration.ApiUrl}/api/v1/categories`, {
      params: params,
    });
  }

  createNewCategory(category: CategoryItem) {
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
