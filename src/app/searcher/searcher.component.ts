import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../artists/user.service';
import { Disciplines } from '../models/disciplines';
import { SearcherUser } from '../models/searcher-user';
import { User } from '../models/user';

// import { UserSearch } from '../models/userSearch';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnInit {

  filterForm: FormGroup;
  disciplines: Disciplines[] = [];
  users: User[] = [];

  @Output() formFilter = new EventEmitter<SearcherUser>();

  locations: string [] = ['Álava/Araba','Albacete','Alicante','Asturias','Ávila','Badajoz','Baleares',
  'Barcelona','Burgos','Cáceres','Cádiz','Cantabria','Castellón','Ceuta','Ciudad Real','Córdoba',
'Cuenca','Gerona/Girona','Granada','Guadalajara','Guipúzcoa/Gipuzkoa','Huelva','Huesca','Jaén',
'La Coruña/A Coruña','La Rioja','Las Palmas','León','Lérida/Lleida','Lugo','Madrid','Málaga','Melilla',
'Murcia','Navarra','Orense/Ourense','Palencia','Pontevedra','Salamanca','Segovia','Sevilla','Soria',
'Tarragona','Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya/Bizkaia','Zamora','Zaragoza'];


  constructor(fb: FormBuilder, private service: UserService) {
    this.filterForm = fb.group({
      user_name: [''],
      last_name: [''],
      artistic_name:[''],
      location: [''],
      discipline_name: [''],
      tag: [''],
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
