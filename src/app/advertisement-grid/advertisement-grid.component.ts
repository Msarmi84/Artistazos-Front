import { Component, OnInit } from '@angular/core';
import { Advertisement } from 'src/app/models/advertisement';
import { AdvertisementService } from '../advertisement.service';

@Component({
  selector: 'app-advertisement-grid',
  templateUrl: './advertisement-grid.component.html',
  styleUrls: ['./advertisement-grid.component.scss']
})
export class AdvertisementGridComponent implements OnInit {

  advertisement: Array<Advertisement> = [];
  constructor(private advertisementService: AdvertisementService) { }

  ngOnInit(): void {
    this.getAdvertisement();
  }

  getAdvertisement():void {
    this.advertisementService.getAdvertisements().subscribe(x => {
      this.advertisement = x;
    })
  }

  filter(filter):void {
    console.log('este es el console de filter del artis grid');
    this.advertisementService.searchAdvertisements(filter).subscribe(x => {
      this.advertisement = x;
    })
  }

  deleteAdvertisement(id: number): void {
    console.log(id, 'id del advertisement');
    
    this.advertisementService.deleteAdvertisement(id).subscribe(() => {
      this.getAdvertisement();
    });
  }

}
