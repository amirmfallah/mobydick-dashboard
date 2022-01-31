import { searchResponse } from './../interfaces/shared.interfaces';
import { BehaviorSubject, Observable } from 'rxjs';
import { Configuration } from './../configuration';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { branch } from 'src/app/products/interfaces/branches.interface';
import * as _ from 'lodash';
import { __createBinding } from 'tslib';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BranchesService {
  branch = new BehaviorSubject<any>(false);

  constructor(private http: HttpClient) {}

  loadBranch() {
    this.getMyBranch().subscribe((res: branch) => {
      this.branch.next(res);
    });
  }

  createBranch(branch: branch) {
    return this.http.post(`${Configuration.ApiUrl}/api/v1/branches`, branch);
  }

  getMyBranch() {
    return this.http.get(`${Configuration.ApiUrl}/api/v1/branches/owner`);
  }

  getBranch() {
    return this.branch;
  }

  patchBranch(branch: branch) {
    return this.http.patch(
      `${Configuration.ApiUrl}/api/v1/branches/${branch._id}`,
      branch
    );
  }
  getAllBranches(page?: number, search?: string): Observable<any> {
    let params = new HttpParams();
    if (page) {
      params = params.append('page', page.toString());
    }
    if (search) {
      params = params.append('search', search);
    }
    return this.http.get<any>(`${Configuration.ApiUrl}/api/v1/branches`, {
      params: params,
    });
  }
  deleteBranchById(id: string) {
    return this.http.delete(`${Configuration.ApiUrl}/api/v1/branches/${id}`);
  }
}
