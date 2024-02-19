import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { apiConfig } from 'api-config';
import { Observable, catchError } from 'rxjs';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthErrorResponse, AuthSuccessResponse } from 'src/app/shared/models/models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = apiConfig.baseUrl;
  private authTokenKey = 'authToken';


  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) { }

  //   login(email: string, password: string) {
  //   return this.http.post<any>(`user/login`, { email, password })
  //     .pipe(map(user => {
  //       // login successful if there's a jwt token in the response
  //       if (user && user.token) {
  //         // store user details and jwt token in local storage to keep user logged in between page refreshes
  //         localStorage.setItem('currentUser', JSON.stringify(user));
  //         this.currentUserSubject.next(user);
  //       }
  //       return user;
  //     }));
  // }


  login(credentials: {email: string, password: string }): Observable<AuthSuccessResponse | AuthErrorResponse> {
    return this.http.post<AuthSuccessResponse | AuthErrorResponse>(`${this.baseUrl}${apiConfig.login}`, credentials).pipe(
      catchError(this.errorHandler.handleError)
    );
  }

  signup(userData: any): Observable<AuthSuccessResponse | AuthErrorResponse> {
    return this.http.post<AuthSuccessResponse | AuthErrorResponse>(`${this.baseUrl}${apiConfig.register}`, userData).pipe(
      catchError(this.errorHandler.handleError)
    );
  }

  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(`${this.baseUrl}${apiConfig.userActions}`).pipe(
  //     catchError(this.errorHandler.handleError)
  //   );
  // }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.authTokenKey);
  }

  setAuthToken(token: string): void {
    localStorage.setItem(this.authTokenKey, token);
  }

  getAuthToken(): string | null {
    return localStorage.getItem(this.authTokenKey);
  }

  clearAuthToken(): void {
    localStorage.removeItem(this.authTokenKey);
  }
  logout(): void {
    this.clearAuthToken();
    this.router.navigate(['/login']);
  }
}
