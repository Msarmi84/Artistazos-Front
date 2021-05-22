import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

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
}
