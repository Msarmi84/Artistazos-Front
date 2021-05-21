import { Component, OnInit } from '@angular/core';
import { UserService } from '../artists/user.service';
import { Disciplines } from '../models/disciplines';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  disciplines: Disciplines[] = [];
  photos: string [] = ['artists.png','dancer.jpg','writer.jpg','guitarristas.jpeg'];
  

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getDisciplines().subscribe(x => this.disciplines = x);
    console.log(this.disciplines);
     this.disciplines.pop();
  }

}
