import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { apiConfig } from 'api-config';
import { BehaviorSubject, Observable, catchError, map } from 'rxjs';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { AuthErrorResponse, AuthSuccessResponse } from 'src/app/shared/models/models';
import { User } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl: string = apiConfig.baseUrl;
  private authTokenKey = 'authToken';
  private currentUserSubject: BehaviorSubject<AuthSuccessResponse | AuthErrorResponse | null>;
  public currentUser: Observable<AuthSuccessResponse | AuthErrorResponse | null>;



  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private router: Router
  ) {
    const storedUser = localStorage.getItem(this.authTokenKey);
    this.currentUserSubject = new BehaviorSubject<AuthSuccessResponse | AuthErrorResponse | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): AuthSuccessResponse | AuthErrorResponse | null {
    return this.currentUserSubject.value;
  }

  login(credentials: { email: string, password: string }): Observable<AuthSuccessResponse | AuthErrorResponse>  {
    return this.http.post<AuthSuccessResponse | AuthErrorResponse>(`${this.baseUrl}${apiConfig.login}`, credentials)
      .pipe(
        map((user: AuthSuccessResponse | AuthErrorResponse) => {
          // login successful if there's a jwt token in the response
          if (user ) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem(this.authTokenKey, JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return user;
        }),
        catchError(this.errorHandler.handleError)
      );
  }

  // login(credentials: {email: string, password: string }): Observable<AuthSuccessResponse | AuthErrorResponse> {
  //   return this.http.post<AuthSuccessResponse | AuthErrorResponse>(`${this.baseUrl}${apiConfig.login}`, credentials).pipe(
  //     catchError(this.errorHandler.handleError)
  //   );
  // }

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
    return !!this.currentUserValue;
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
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }
}
