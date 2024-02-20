import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiConfig } from 'api-config';
import { Observable, forkJoin, map, of, switchMap } from 'rxjs';
import {  User, userData } from 'src/app/shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = apiConfig.baseUrl;

  constructor(private http: HttpClient) {}

  listAllUsers(): Observable<userData[]> {
    return this.listUsers(1).pipe(
      switchMap(response => {
        const totalPages = response.total_pages;
        const allPagesRequests: Observable<User>[] = [of(response)]; // Include the first page already fetched

        // Start from page 2 since the first page is already fetched
        for (let page = 2; page <= totalPages; page++) {
          allPagesRequests.push(this.listUsers(page));
        }

        return forkJoin(allPagesRequests);
      }),
      map(responses => {
        // Flatten all `data` arrays from each page into a single array of `userData`
        const allUsers = responses.flatMap(res => res.data);
        return allUsers;
      })
    );
  }

  listUsers(page: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}${apiConfig.userActions}`, {
      params: { page: page.toString() }
    });
  }

  createUser(userData: userData): Observable<userData> {
    return this.http.post<userData>(`${this.baseUrl}${apiConfig.userActions}`, userData);
  }

  updateUser(userId: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}${apiConfig.userActions}/${userId}`, user);
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}${apiConfig.userActions}/${userId}`);
  }
}
