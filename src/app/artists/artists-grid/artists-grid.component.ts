import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';
import { UserService } from '../user.service';
import { Disciplines } from 'src/app/models/disciplines';



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

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  
    for(let i = 0; i <this.users.length; i++){
      this.userService.getDisciplinesById(this.users[i].user_id).subscribe(discipline => this.disciplines = discipline);
    }
    
    this.getDisciplines();
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


}
