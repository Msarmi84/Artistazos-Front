import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../artists/user.service';
import { Disciplines } from '../models/disciplines';
import { IdName } from '../models/id-name';
import { User } from '../models/user';

import { UserSearch } from '../models/userSearch';

@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss']
})
export class SearcherComponent implements OnInit {

  filterForm: FormGroup;
  disciplines: Disciplines[] = [];
  users: User[] = [];


  constructor(fb: FormBuilder, private service: UserService) {
    this.filterForm = fb.group({
      user_name: [''],
      last_name: [''],
      artistic_name:[''],
      location: [''],
      discipline_name: [null],
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
