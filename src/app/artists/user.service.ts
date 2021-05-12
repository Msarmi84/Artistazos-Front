import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { UserSearch } from '../models/userSearch';
import { environment } from '../../environments/environment';
import { Disciplines } from '../models/disciplines';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.URL}/${id}`)
      .pipe(map(user => new User(user)));
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }

  updateUser(user: FormData, id: number): Observable<User> {
    return this.http.put<User>(`${this.URL}/${id}`, user);
  }


  getDisciplines(): Observable<Disciplines[]> {

    return this.http.get<Disciplines[]>(`${this.URL}/disciplines`).pipe(
      map(x => x.map(discipline => new Disciplines(discipline)))
    )
  }

  searchUsers( filtro:UserSearch): Observable<User[]> {

    return this.http.post<User[]>(`${this.URL}/buscar`, filtro).pipe(
        map(x => x.map(user => new User(user)))
      );
  }



}

