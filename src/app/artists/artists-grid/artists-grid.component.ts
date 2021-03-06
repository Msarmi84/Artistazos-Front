import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';
import { UserService } from '../user.service';
import { Disciplines } from 'src/app/models/disciplines';
import { getUserFromToken, isAdmin } from '../../_helpers/tokenHelper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artists-grid',
  templateUrl: './artists-grid.component.html',
  styleUrls: ['./artists-grid.component.scss']
})
export class ArtistsGridComponent implements OnInit {

  defaultImg = 'assets/images/logonofoto.png';
  imageUrl = environment.baseUrl + 'images/';
  disciplines: Disciplines[]

  users: User[] = [];
  isAdmin: boolean = false;

  constructor(
    private userService: UserService, 
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getUsers(isAdmin());
    this.isAdmin = isAdmin();
  
    for(let i = 0; i <this.users.length; i++){
      this.userService.getDisciplinesById(this.users[i].user_id).subscribe(discipline => this.disciplines = discipline);
    }
    
    this.getDisciplines();
  }

  getUsers(admin: boolean): void {
    this.userService.getUsers(admin).subscribe((users) => this.users = users);
  }

  //  obtiene disciplinas 
   getDisciplines(): void {
    this.userService.getDisciplines().subscribe(discipline => this.disciplines = discipline);
  }

  filter(filter):void {
    console.log('este es el console de filter del artis grid');
    this.userService.searchUsers(filter).subscribe(x => {
      this.users = x;
    })
  }

  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.getUsers(isAdmin());
    });
  }
  
  hideUser(id: number): void {
    this.userService.hideUser(id).subscribe(() => {
      this.getUsers(isAdmin());
    });
  }
  
  showUser(id: number): void {
    this.userService.showUser(id).subscribe(() => {
      this.getUsers(isAdmin());
    });
  }
}
