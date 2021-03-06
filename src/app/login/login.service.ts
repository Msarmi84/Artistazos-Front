import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../services/local-storage.service';

export interface TokenResponse {
  token: string;
}

interface Credentials {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // http://localhost:3000/user/login
  URL = environment.baseUrl + 'users/login';

  constructor(private http: HttpClient, private lss: LocalStorageService) { }

  login(credentials: Credentials): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(this.URL, credentials)
      .pipe(tap(loginResponse => this.lss.saveUserToken(loginResponse.token)));
  }
}
