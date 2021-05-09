import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-artists-grid',
  templateUrl: './artists-grid.component.html',
  styleUrls: ['./artists-grid.component.scss']
})
export class ArtistsGridComponent implements OnInit {

  defaultImg = 'assets/images/logonofoto.png';
  imageUrl = environment.baseUrl + 'images/';

  constructor() { }

  ngOnInit(): void {
  }

}
