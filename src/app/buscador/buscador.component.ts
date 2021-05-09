import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../artists/user.service';
import { Disciplines } from '../models/disciplines';
import { IdName } from '../models/id-name';
import { User } from '../models/user';

import { UserSearch } from '../models/UserSearch';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit {

  filterForm: FormGroup;
  disciplines: Disciplines[] = []
  users: User[] = []


  constructor(fb: FormBuilder, private service: UserService) {
    this.filterForm = fb.group({
      user_name: [''],
      last_name: [''],
      location: [''],
      discipline_id: [null],
      tags: [''],
    })
   }

  ngOnInit(): void {
   this.service.getDisciplines().subscribe(x => {
      this.disciplines = x;
    });
  }

  onSubmit(){
    this.service.searchUsers(this.filterForm.value).subscribe(x => {
      this.users = x;
    })
  }

}
