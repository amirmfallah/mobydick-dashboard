import { CreateIngredient } from './../interfaces/shared.interfaces';
import { Configuration } from './../configuration';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IngredientsService {
  constructor(private http: HttpClient) {}

  getAllIngredients(page?: number, search?: string): Observable<any> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page.toString());
    }
    if (search) {
      params = params.append('search', search);
    }
    return this.http.get<any>(`${Configuration.ApiUrl}/api/v1/ingredients`, {
      params: params,
    });
  }

  deleteIngredientsById(id: string): Observable<any> {
    return this.http.delete<any>(
      `${Configuration.ApiUrl}/api/v1/ingredients/${id}`
    );
  }

  createIngredients(ingredients: CreateIngredient) {
    return this.http.post(
      `${Configuration.ApiUrl}/api/v1/ingredients`,
      ingredients
    );
  }
}
