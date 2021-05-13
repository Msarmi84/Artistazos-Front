import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Disciplines } from 'src/app/models/disciplines';
import { User } from 'src/app/models/user';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { UserService } from '../user.service';


@Component({
  selector: 'app-artists-form',
  templateUrl: './artists-form.component.html',
  styleUrls: ['./artists-form.component.scss']
})
export class ArtistsFormComponent implements OnInit {

  registerForm: FormGroup;
  submitted: Boolean = false;
  dateReg: RegExp = /^\d{2}[./-]\d{2}[./-]\d{4}$/;
  disciplines: Disciplines[];
  locations: string [] = ['Álava/Araba','Albacete','Alicante','Asturias','Ávila','Badajoz','Baleares',
  'Barcelona','Burgos','Cáceres','Cádiz','Cantabria','Castellón','Ceuta','Ciudad Real','Córdoba',
'Cuenca','Gerona/Girona','Granada','Guadalajara','Guipúzcoa/Gipuzkoa','Huelva','Huesca','Jaén',
'La Coruña/A Coruña','La Rioja','Las Palmas','León','Lérida/Lleida','Lugo','Madrid','Málaga','Melilla',
'Murcia','Navarra','Orense/Ourense','Palencia','Pontevedra','Salamanca','Segovia','Sevilla','Soria',
'Tarragona','Tenerife','Teruel','Toledo','Valencia','Valladolid','Vizcaya/Bizkaia','Zamora','Zaragoza'];
  
  

  seleccionados: string[] = [];


  constructor(formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.registerForm = formBuilder.group({
      artistic_name: ['', Validators.required],
      user_name: ['', Validators.required],
      last_name: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      // date_of_birth: ['', Validators.pattern(this.dateReg)],
      location: ['', Validators.required],
      // biography: ['', [Validators.required]],
      discipline_name: [''],
      // artistic_cv: ['', [Validators.required]],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      // avatar:['']
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });

   }

  ngOnInit(): void {
    this.getDisciplines();

  }

  getDisciplines(): void {
    this.userService.getDisciplines().subscribe(discipline => this.disciplines = discipline);
  }

  get loginForm() { return this.registerForm.controls; }

  onSubmit(obj: any): void {

    this.submitted = true;

    if (this.registerForm.valid) {
      this.userService.saveUser(this.registerForm.value).subscribe(x => {
        if (x) {
          this.router.navigate(['artists-grid']);
        }
      });
    }
  }
// console.log(this.registerForm.value)

//       this.submitted = true;

//       // stop here if form is invalid
//       if (this.registerForm.invalid) {
//           return;
//       }

//       alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
//     }



}
