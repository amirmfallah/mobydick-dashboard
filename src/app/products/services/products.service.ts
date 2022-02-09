import { Observable } from 'rxjs';
import { Configuration } from './../../../core/configuration';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductsService {
  constructor(private http: HttpClient) {}
  getAllProducts(page?: number, search?: string): Observable<any> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page.toString());
    }
    if (search) {
      params = params.append('search', search);
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
  patchProduct(id: string, product: any) {
    return this.http.patch(
      `${Configuration.ApiUrl}/api/v1/products/${id}`,
      product
    );
  }

  getProduct(id: string) {
    return this.http.get(`${Configuration.ApiUrl}/api/v1/products/${id}`);
  }
}
