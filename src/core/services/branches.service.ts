import { BehaviorSubject } from 'rxjs';
import { Configuration } from './../configuration';
import { HttpClient } from '@angular/common/http';
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
    return this.http.get(`${Configuration.ApiUrl}/api/v1/branches/owner`).pipe(
      tap((res: branch) => {
        if (res !== null) {
          this.branch.next(res);
        }
      })
    );
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
}
