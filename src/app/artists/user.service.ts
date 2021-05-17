import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { UserSearch } from '../models/userSearch';
import { environment } from '../../environments/environment';
import { Disciplines } from '../models/disciplines';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL = environment.baseUrl + 'users';
  constructor(private http: HttpClient, private lss: LocalStorageService) { }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.URL)
      .pipe(map(users => users.map(user => new User(user))));
  }

  saveUser(user: User): Observable<any> {
    console.log('console del service');
    if (user.user_id) {
      console.log('entra en updateUser');
      
    return this.http.put<User>(`${this.URL}/updateUserData/${user.user_id}`, user).pipe(
      map((x: any) => {
        return new User(x);
      })
    );
    } else {
      console.log('entra en guardar nuevo usuario');
      
      return this.http.post<User>(`${this.URL}/saveUser`, user).pipe(tap(loginResponse => this.lss.saveUserToken(loginResponse.token)))
      }
  }





  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.URL}/userById/${id}`)
      .pipe(map(user => new User(user)));
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/delete/${id}`);
  }

  updateUser(user: FormData, id: number): any {
    console.log('servicio user')
    console.log(user)
    return this.http.put<User>(`${this.URL}/updateProfile/${id}`, user);
  }


  getDisciplines(): Observable<Disciplines[]> {

    return this.http.get<Disciplines[]>(`${this.URL}/disciplines`).pipe(
      map(x => x.map(discipline => new Disciplines(discipline)))
    );
  }

  getDisciplinesById(user_id: number): Observable<Disciplines[]> {
    console.log(user_id)
    return this.http.get<Disciplines[]>(`${this.URL}/disciplines/${user_id}`)
      .pipe(map(x => x.map(discipline => new Disciplines(discipline)))
      );
  }

  searchUsers( filtro: UserSearch): Observable<User[]> {

    return this.http.post<User[]>(`${this.URL}/find`, filtro).pipe(
        map(x => x.map(user => new User(user)))
      );
  }



}
