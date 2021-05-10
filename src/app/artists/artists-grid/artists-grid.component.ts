import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/models/user';
import { UserService } from '../user.service';


@Component({
  selector: 'app-artists-grid',
  templateUrl: './artists-grid.component.html',
  styleUrls: ['./artists-grid.component.scss']
})
export class ArtistsGridComponent implements OnInit {

  defaultImg = 'assets/images/logonofoto.png';
  imageUrl = environment.baseUrl + 'images/';

  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
    console.log(this.users + 'aaaa');
  }


}
