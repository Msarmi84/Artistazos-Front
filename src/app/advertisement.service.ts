import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Advertisement } from './models/Advertisement';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  URL = environment.baseUrl + 'advertisement';

  constructor(private http: HttpClient) { }

  create(formData: FormData): Observable<string> {
    debugger;
    return this.http.post<string>(`${this.URL}`, formData);
  }

  getAdvertismentsForUser(user_id: number): Observable<Advertisement[]> {
    return this.http.get<Advertisement[]>(`${this.URL}/foruser/${user_id}`)
      .pipe(map(ads => ads.map(advertisement => new Advertisement(advertisement))));
  }

}