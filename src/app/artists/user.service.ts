import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { UserSearch } from '../models/UserSearch';
import { environment } from '../../environments/environment';
import { Disciplines } from '../models/disciplines';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { LocalStorageService } from '../services/local-storage.service';
import { TokenResponse } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  URL = environment.baseUrl + 'users';
  constructor(private http: HttpClient, private lss: LocalStorageService) { }


  getUsers(isAdmin: boolean): Observable<User[]> {
    if(isAdmin) return this.http.get<User[]>(`${this.URL}/allUsers`)
    .pipe(map(users => users.map(user => new User(user))));
    return this.http.get<User[]>(this.URL)
      .pipe(map(users => users.map(user => new User(user))));
  }
  getUsersByDiscipline(discipline_id: number): Observable<User[]>{
    return this.http.get<User[]>(`${this.URL}/usersByDisciplines/${discipline_id}`)
    .pipe(map(users => users.map(user => new User(user))));
  }


  // saveUser(user: User): Observable<TokenResponse> {
  //   console.log('console del service');
  //   if (user.user_id) {
  //     console.log('entra en updateUser');

  //   return this.http.put<TokenResponse>(`${this.URL}/updateUserData/${user.user_id}`, user).pipe(
  //     map((x: any) => {
  //       return new User(x);
  //     })
  //   );
  //   } else {
  //     console.log('entra en guardar nuevo usuario');

  //     return this.http.post<TokenResponse>(`${this.URL}/saveUser`, user).pipe(tap(saveResponse => {
  //       return this.lss.saveUserToken(saveResponse.token)
  //     }))
  //     }
  // }

  saveUser(user: User): Observable<TokenResponse> {
      return this.http.post<TokenResponse>(`${this.URL}/saveUser`, user).pipe(tap(saveResponse => {
        return this.lss.saveUserToken(saveResponse as unknown as string)
      }))
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.URL}/userById/${id}`)
      .pipe(map(user => new User(user)));
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/deleteByAdmin/${id}`);
  }

  hideUser(id: number): any {
    return this.http.put<void>(`${this.URL}/hide/${id}`, null);
  }

  showUser(id: number): any {
    return this.http.put<void>(`${this.URL}/show/${id}`, null);
  }

  updateUser(user: FormData, id: number): any {
    return this.http.put<User>(`${this.URL}/updateProfile/${id}`, user).pipe(tap((res: any) => {
      return this.lss.saveUserToken(res as unknown as string)
    }));
  }


  getDisciplines(): Observable<Disciplines[]> {

    return this.http.get<Disciplines[]>(`${this.URL}/disciplines`).pipe(
      map(x => x.map(discipline => new Disciplines(discipline)))
    );
  }

  getDisciplinesById(user_id: number): Observable<Disciplines[]> {

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
