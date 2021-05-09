import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { UserSearch } from '../models/UserSearch';
import { environment } from '../../environments/environment';
import { Disciplines } from '../models/disciplines';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users_url = `${environment.baseUrl}/users`


  constructor(private http: HttpClient) { }

  // /**
  //  * Creación de un usuario
  //  * @param user
  //  * @returns
  //  */
  // createUser(user: User) : Promise<any> {
  //   /* Creamos el formulario para enviarlo al backend */
  //   const formData = UserService.formData(user);

  //   return new Promise((resolve, reject) => {
  //     const url = `${this.users_url}/`;
  //     fetch(url, {
  //       method: 'POST',
  //       body: formData,
  //     })
  //     .then(r => r.json())
  //     .then(response => {
  //       resolve(response);
  //     }).catch(reject);
  //   });
  // }

  // /**
  //  * Hacer login
  //  * @param mail
  //  * @param password
  //  * @returns
  //  */
  // login(mail: string, password: string) : Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     const url = `${this.users_url}/login`;
  //     fetch(url, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({ mail, password })
  //     })
  //     .then(r => r.json())
  //     .then(response => {
  //       localStorage.setItem('token', response.token);
  //       resolve(null);
  //     }).catch(reject);

  //   });
  // }

  // /**
  //  * Cerrar sesion
  //  */
  // logout() : void {
  //   // Eliminamos el token
  //   localStorage.removeItem('token');
  // }

  // /* Métodos que necesitan que el usuario esté autenticado */

  // /**
  //  * Buscar usuarios
  //  * @param userSearch
  //  * @returns
  //  */
  // getUsers(userSearch: UserSearch) : Promise<User[]> {
  //   return new Promise((resolve, reject) => {
  //     // Creamos la query: ?user_name=A&tags=pianista,flauta
  //     const url = `${this.users_url}/?${userSearch.getQuery()}`;
  //     UserService.authFetch(url)
  //       .then(r => r.json())
  //       .then(users => resolve(users))
  //       .catch(reject);
  //   })
  // }

  // /**
  //  * Actualizar un usuario
  //  * @param user
  //  * @returns
  //  */
  // updateUser(user: User) {

  //   return new Promise((resolve, reject) => {
  //     if (user.user_id == undefined) {
  //       return reject('El usuario no tiene el id asignado');
  //     }
  //     const formData = UserService.formData(user);
  //     const url = `${this.users_url}/${user.user_id}`;
  //     fetch(url, {
  //       method: 'PUT',
  //       body: formData,
  //     })
  //     .then(r => r.json())
  //     .then(response => {
  //       localStorage.setItem('token', response.token);
  //       resolve(null);
  //     }).catch(reject);

  //   });
  // }

  // /**
  //  * Eliminar un usuario
  //  * @param user
  //  * @returns
  //  */
  // deleteUser(user: User) {

  //   return new Promise((resolve, reject) => {
  //     if (user.user_id == undefined) {
  //       return reject('El usuario no tiene el id asignado');
  //     }
  //     const url = `${this.users_url}/${user.user_id}`;
  //     fetch(url, {
  //       method: 'DELETE',
  //     })
  //     .then(r => r.json())
  //     .then(response => {
  //       resolve(null);
  //     }).catch(reject);
  //   });
  // }

  // /**
  //  * Obtener las tags de un usuario
  //  * @param user
  //  * @returns
  //  */
  // getTags(user: User) : Promise<string[]> {
  //   return new Promise((resolve, reject) => {
  //     if (user.user_id == undefined) {
  //       return reject('El usuario no tiene el id asignado');
  //     }
  //     const url = `${this.users_url}/${user.user_id}/tags`;
  //     fetch(url)
  //     .then(r => r.json())
  //     .then(tags => {
  //       resolve(tags);
  //     }).catch(reject);
  //   });
  // }

  // /**
  //  * Fetch for authenticated routes
  //  */
  // static authFetch(url,init?) {
  //   const token = localStorage.getItem('token');
  //   const bearer = `Bearer ${token}`;
  //   return fetch(url, {
  //     headers: {
  //       'Authentication': bearer
  //     },
  //      ...init })
  // }

  // /**
  //  * Preparamos el form data del usuario
  //  * @param user
  //  * @returns El form data del user
  //  */
  // static formData(user: User) : FormData {

  //   const formData = new FormData();
  //   formData.append('date_of_birth', user.date_of_birth);
  //   formData.append('last_name', user.last_name);
  //   formData.append('user_name', user.user_name);
  //   formData.append('artistic_name', user.artistic_name);
  //   formData.append('biography', user.biography);
  //   formData.append('artistic_cv', user.artistic_cv);
  //   formData.append('avatar', user.avatar);
  //   formData.append('location', user.location);
  //   formData.append('avatar', user.avatar);
  //   formData.append('type', user.type);
  //   formData.append('mail', user.mail);
  //   formData.append('discipline_id', user.discipline_id.toString());
  //   formData.append('tags', user.tags.join(','));
  //   return formData;
  // }


  getDisciplines(): Observable<Disciplines[]> {

    return this.http.get<Disciplines[]>(`${this.users_url}/disciplinas`).pipe(
      map(x => x.map(discipline => new Disciplines(discipline)))
    )
  }

  searchUsers( filtro:UserSearch): Observable<User[]> {
    
    return this.http.post<User[]>('http://localhost:3000/viajes/buscar', filtro).pipe(
        map(x => x.map(user => new User(user)))
      )
      
  }


}
