import { Observable } from 'rxjs';
import { Configuration } from './../../../core/configuration';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductsService {
  constructor(private http: HttpClient) {}
  getAllProducts(): Observable<any> {
    return this.http.get<any>(`${Configuration.ApiUrl}/api/v1/products`);
  }

  deleteProductById(id: string): Observable<any> {
    return this.http.delete<any>(
      `${Configuration.ApiUrl}/api/v1/products/${id}`
    );
  }

  createProduct(product: any) {
    return this.http.post(`${Configuration.ApiUrl}/api/v1/products`, product);
  }
}
