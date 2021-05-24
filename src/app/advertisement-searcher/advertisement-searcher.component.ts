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

  locations: string [] = ['Álava/Araba','Albacete','Alicante','Asturias','Ávila','Badajoz','Baleares',
  'Barcelona','Burgos','Cáceres','Cádiz','Cantabria','Castellón','Ceuta','Ciudad Real','Córdoba',
'Cuenca','Gerona/Girona','Granada','Guadalajara','Guipúzcoa/Gipuzkoa','Huelva','Huesca','Jaén',
'La Coruña/A Coruña','La Rioja','Las Palmas','León','Lérida/Lleida','Lugo','Madrid','Málaga','Melilla',
'Murcia','Navarra','Orense/Ourense','Palencia','Pontevedra','Salamanca','Segovia','Sevilla','Soria',
'Tarragona','Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya/Bizkaia','Zamora','Zaragoza'];

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
