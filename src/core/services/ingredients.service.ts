import { Configuration } from './../configuration';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IngredientsService {
  constructor(private http: HttpClient) {}
  getAllIngredients() {
    return this.http.get(`${Configuration.ApiUrl}/api/v1/ingredients`);
  }
}
