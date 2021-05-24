import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../artists/user.service';
import { AdvertisementSearcher } from '../models/advertisement-searcher';
import { Disciplines } from '../models/disciplines';

@Component({
  selector: 'app-advertisement-searcher',
  templateUrl: './advertisement-searcher.component.html',
  styleUrls: ['./advertisement-searcher.component.scss']
})
export class AdvertisementSearcherComponent implements OnInit {

  locations: string [] = ['Alava/Araba', 'Albacete', 'Alicante', 'Asturias', 'Avila', 'Badajoz', 'Baleares',
  'Barcelona', 'Burgos', 'Caceres', 'Cadiz', 'Cantabria', 'Castellon', 'Ceuta', 'Ciudad Real', 'Cordoba',
  'Cuenca', 'Gerona/Girona', 'Granada', 'Guadalajara', 'Guipuzcoa/Gipuzkoa', 'Huelva', 'Huesca', 'Jaen',
  'La Coruña/A Coruña', 'La Rioja', 'Las Palmas', 'Leon', 'Lerida/Lleida', 'Lugo', 'Madrid', 'Malaga', 'Melilla',
  'Murcia', 'Navarra', 'Orense/Ourense', 'Palencia', 'Pontevedra', 'Salamanca', 'Segovia', 'Sevilla', 'Soria',
  'Tarragona', 'Tenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya/Bizkaia', 'Zamora', 'Zaragoza'];

disciplines: Disciplines[] = [];
filterForm: FormGroup;
@Output() formFilter = new EventEmitter<AdvertisementSearcher>();

  constructor(fb: FormBuilder,private service: UserService) {
    this.filterForm = fb.group({
      advertisement_name: [''],
      location: [''],
      discipline_name:['']
    })
   }

  ngOnInit(): void {
    this.service.getDisciplines().subscribe(x => {
      this.disciplines = x;
    });
  }

  onSubmit(){
    this.formFilter.emit(this.filterForm.value);
    this.filterForm.reset()
  }

}
