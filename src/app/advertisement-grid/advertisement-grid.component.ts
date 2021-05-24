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

  //Obtiene la lista de anuncios guardados en la base de datos
  getAdvertisement():void {
    this.advertisementService.getAdvertisements().subscribe(x => {
      this.advertisement = x;
    })
  }

  //Obtiene un array de anuncios filtrados en el formulario
  filter(filter):void {
    this.advertisementService.searchAdvertisements(filter).subscribe(x => {
      this.advertisement = x;
    })
  }

  //Realiza un borrado lógico del anuncio
  deleteAdvertisement(id: number): void {
    
    this.advertisementService.deleteAdvertisement(id).subscribe(() => {
      this.getAdvertisement();
    });
  }

}
