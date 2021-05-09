import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL = environment.baseUrl + 'users';
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.URL)
      .pipe(map(users => users.map(user => new User(user))));
  }

  saveUser(user: FormData): Observable<void> {
    return this.http.post<void>(this.URL, user);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.URL}/${id}`)
      .pipe(map(user => new User(user)));
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }

  updateUser(user: FormData, id: number): Observable<User> {
    return this.http.put<User>(`${this.URL}/${id}`, user);
  }
}
