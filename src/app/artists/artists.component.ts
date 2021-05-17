import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { UserService } from './user.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.scss']
})
export class ArtistsComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(res => this.users = res);
  }
  // saveUser(user: FormData): void {
  //   this.userService.saveUser(user).subscribe(() => this.getUsers());
  // }




}
