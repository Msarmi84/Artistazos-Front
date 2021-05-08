import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-artistas-grid',
  templateUrl: './artistas-grid.component.html',
  styleUrls: ['./artistas-grid.component.scss']
})
export class ArtistasGridComponent implements OnInit {

  defaultImg = 'assets/images/logonofoto.png';
  imageUrl = environment.baseUrl + 'images/';

  constructor() { }

  ngOnInit(): void {
  }

}
