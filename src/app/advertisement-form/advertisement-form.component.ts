  
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AdvertisementService } from '../advertisement.service';
import { UserService } from '../artists/user.service';
import { Disciplines } from '../models/disciplines';

@Component({
  selector: 'app-advertisement-form',
  templateUrl: './advertisement-form.component.html',
  styleUrls: ['./advertisement-form.component.scss']
})
export class AdvertisementFormComponent implements OnInit {

  submit = false;
  @ViewChild('myPhoto', { static: false }) file: ElementRef;
  advertisementForm;

  selectDisciplines = new FormControl();
  disciplinesValues: string[];
  disciplinesString: string;

  disciplines: Disciplines[];

  locations: string[] = ['Álava/Araba', 'Albacete', 'Alicante', 'Asturias', 'Ávila', 'Badajoz', 'Baleares',
    'Barcelona', 'Burgos', 'Cáceres', 'Cádiz', 'Cantabria', 'Castellón', 'Ceuta', 'Ciudad Real', 'Córdoba',
    'Cuenca', 'Gerona/Girona', 'Granada', 'Guadalajara', 'Guipúzcoa/Gipuzkoa', 'Huelva', 'Huesca', 'Jaén',
    'La Coruña/A Coruña', 'La Rioja', 'Las Palmas', 'León', 'Lérida/Lleida', 'Lugo', 'Madrid', 'Málaga', 'Melilla',
    'Murcia', 'Navarra', 'Orense/Ourense', 'Palencia', 'Pontevedra', 'Salamanca', 'Segovia', 'Sevilla', 'Soria',
    'Tarragona', 'Tenerife', 'Teruel', 'Toledo', 'Valencia', 'Valladolid', 'Vizcaya/Bizkaia', 'Zamora', 'Zaragoza'];

  constructor(private formBuilder: FormBuilder,
    private userService: UserService,
    private advertisementService: AdvertisementService) {

    this.advertisementForm = this.formBuilder.group({
      name: ['', Validators.required],
      link: [''],
      selectDisciplines: ['', Validators.required],
      location: ['', Validators.required],
      myPhoto: ['', Validators.required]
    });

  }

  get f() {
    return this.advertisementForm;
  }

  ngOnInit(): void {
    this.getDisciplines();
  }

  //obtiene disciplinas
  getDisciplines(): void {
    this.userService.getDisciplines().subscribe(discipline => this.disciplines = discipline);
  }

  clickDiscipline() {
    console.log('entra en click')
    console.log(this.selectDisciplines)
    this.disciplinesValues = this.selectDisciplines.value;
    console.log('estas síiii')
    console.log(this.disciplinesValues.toString())
    this.disciplinesString = this.disciplinesValues.toString();

  }

  onSubmit() {
    debugger;

    if (!this.advertisementForm.invalid) {
      const advertisement = this.advertisementForm.value;

      const inputFile = this.file.nativeElement;
      let file: File;
      const formData: FormData = new FormData();

      if (inputFile.files.length > 0) {
        file = inputFile.files[0];
      }

      if (file) {
        formData.append('advertisement_photo', file, file.name);
      }
      formData.append('name', advertisement.name);
      formData.append('link', advertisement.link);
      formData.append('location', advertisement.location);
      formData.append('selectDisciplines', advertisement.selectDisciplines);

      this.advertisementService.create(formData).subscribe(
        (res: string) => {
          console.log('exito:' + res);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

}