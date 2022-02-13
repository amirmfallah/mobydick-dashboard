import { User } from 'src/app/products/interfaces/branches.interface';
import { BranchesService } from 'src/core/services/branches.service';
import { SignUp } from './../../app/auth/shared/authentication.interface';
import { Configuration } from '../configuration';
import { Role, Tokens } from '../core.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  private readonly ROLES = 'ROLES';
  private readonly BRANCH_ID = 'BRANCH_ID';
  IsLoggedIn = new BehaviorSubject<boolean>(false);

  private loggedUser: string;
  public roles: Array<Role>;
  constructor(private http: HttpClient) {}

  signup(user: SignUp): Observable<any> {
    return this.http.post<any>(
      `${Configuration.ApiUrl}/api/v1/auth/password/signup`,
      user
    );
  }

  login(user: { username: string; password: string }): Observable<any> {
    return this.http
      .post<any>(`${Configuration.ApiUrl}/api/v1/auth/password/login`, user)
      .pipe(
        tap((res) =>
          this.doLoginUser(
            user.username,
            {
              token: res.accessToken,
              refreshToken: res.refreshToken,
            },
            res.roles
          )
        )
      );
  }

  logout(): void {
    this.doLogoutUser();
  }

  isLoggedIn(): boolean {
    return !!this.getJwtToken();
  }

  refreshToken(): Observable<Tokens> {
    return this.http
      .post<any>(`${Configuration.ApiUrl}/api/v1/auth/refresh`, {
        refreshToken: this.getRefreshToken(),
      })
      .pipe(
        tap((tokens: Tokens) => {
          this.storeJwtToken(tokens.token);
        })
      );
  }

  getJwtToken(): any {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  private doLoginUser(username: string, tokens: Tokens, roles: Role[]): void {
    this.loggedUser = username;
    this.storeTokens(tokens, roles);
  }

  private doLogoutUser(): void {
    this.loggedUser = null;
    this.removeTokens();
  }

  private getRefreshToken(): any {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  private storeJwtToken(token: string): void {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  private storeTokens(tokens: Tokens, roles: Role[]): void {
    localStorage.setItem(this.JWT_TOKEN, tokens.token);
    localStorage.setItem(this.REFRESH_TOKEN, tokens.refreshToken);
    localStorage.setItem(this.ROLES, JSON.stringify(roles));
  }

  private removeTokens(): void {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    localStorage.removeItem(this.ROLES);
  }

  hasAccess(role: Role) {
    const roles = <Array<Role>>JSON.parse(localStorage.getItem(this.ROLES));
    return roles.includes(role);
  }

  getUserInfo() {
    return this.http.get(`${Configuration.ApiUrl}/api/v1/users/info`);
  }

  updateUserInfo(user: User) {
    return this.http.patch(`${Configuration.ApiUrl}/api/v1/users/info`, user);
  }
}
