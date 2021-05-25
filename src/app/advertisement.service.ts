import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AdvertisementSearcher } from './models/advertisement-searcher';
import { Advertisement } from './models/advertisement';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {

  URL = environment.baseUrl + 'advertisement';

  constructor(private http: HttpClient) { }

  getAdvertisements(): Observable<Advertisement[]> {
    return this.http.get<Advertisement[]>(`${this.URL}`).pipe(
      map(x => x.map(advertisement => new Advertisement(advertisement)))
    );
  }

  getAdvertisementsByLocation(location: string): Observable<Advertisement[]> {
    return this.http.get<Advertisement[]>(`${this.URL}/location/${location}`).pipe(
      map(x => x.map(advertisement => new Advertisement(advertisement)))
    );
  } 

  getAdvertisementsByLocationAndDisciplines(location: string, disciplines: string[]): Observable<Advertisement[]> {
    return this.http.get<Advertisement[]>(`${this.URL}/search?location=${location}&discipline_id=${disciplines.join(",")}`).pipe(
      map(x => x.map(advertisement => new Advertisement(advertisement)))
    );
  } 

  create(formData: FormData): Observable<string> {
    return this.http.post<string>(`${this.URL}`, formData);
  }


  searchAdvertisements( filtro: AdvertisementSearcher): Observable<Advertisement[]> {
    console.log('filtro de busqueda del service de anuncios');

    console.log(filtro)

    return this.http.post<Advertisement[]>(`${this.URL}/find`, filtro).pipe(
        map(x => x.map(user => new Advertisement(user)))
      );
  }

  deleteAdvertisement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.URL}/${id}`);
  }



}
