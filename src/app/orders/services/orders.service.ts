import { OrderDto } from './../interfaces/orders.interface';
import { map, skip, switchMap } from 'rxjs/operators';
import { Configuration } from './../../../core/configuration';
import { BranchesService } from './../../../core/services/branches.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from 'src/core/core.interface';
import { AuthService } from 'src/core/services/auth.service';
import { branchSearch, OrderExistingDto } from '../interfaces/orders.interface';

@Injectable()
export class OrdersService {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private branchesService: BranchesService
  ) {
    this.branchesService.loadBranch();
  }

  getAllOrders(page?: number, search?: string) {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page.toString());
    }
    if (search) {
      params = params.append('search', search);
    }
    if (!this.authService.hasAccess(Role.Super)) {
      return this.branchesService.getBranch().pipe(
        switchMap((branch: branchSearch) => {
          return this.http.get(
            `${Configuration.ApiUrl}/api/v1/orders/branch/${branch._id}`,
            { params: params }
          );
        })
      );
    } else {
      return this.http.get(`${Configuration.ApiUrl}/api/v1/orders`, {
        params: params,
      });
    }
  }

  getOrderById(id: string) {
    return this.http.get(`${Configuration.ApiUrl}/api/v1/orders/${id}`);
  }

  getCartById(id: string) {
    return this.http.get(`${Configuration.ApiUrl}/api/v1/carts/${id}`);
  }

  updateOrder(id: string, payload: OrderDto) {
    return this.http.patch(
      `${Configuration.ApiUrl}/api/v1/orders/${id}`,
      payload
    );
  }
}
