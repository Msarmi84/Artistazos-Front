import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';




@Component({
  selector: 'app-artist-single',
  templateUrl: './artist-single.component.html',
  styleUrls: ['./artist-single.component.scss']
})
export class ArtistSingleComponent implements OnInit {

  user: User;
  imageUrl = environment.baseUrl + 'images/';
  defaultImage = 'assets/images/logonofoto.png';


  constructor() { }

  ngOnInit(): void {
  }

}
