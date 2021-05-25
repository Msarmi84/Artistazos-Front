import { Component, Input, OnInit } from '@angular/core';
import { Advertisement } from 'src/app/models/advertisement';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { getUserFromToken } from 'src/app/_helpers/tokenHelper';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss']
})
export class AdvertisementComponent implements OnInit {

  @Input() advertisementsByLocation: Advertisement[] = [];
  
  constructor() { }

  ngOnInit(): void {
    console.log(this.advertisementsByLocation)
  }
}
