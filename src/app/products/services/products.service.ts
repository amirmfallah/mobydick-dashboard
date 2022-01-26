import { Observable } from 'rxjs';
import { Configuration } from './../../../core/configuration';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductsService {
  constructor(private http: HttpClient) {}
  getAllProducts(page?: number): Observable<any> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page.toString());
    }
    return this.http.get<any>(`${Configuration.ApiUrl}/api/v1/products`, {
      params: params,
    });
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
