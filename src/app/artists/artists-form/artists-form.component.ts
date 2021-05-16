import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  user: User;

  userId: Number;


  constructor(formBuilder: FormBuilder, private userService: UserService, private router: Router,  private route: ActivatedRoute) {
    this.registerForm = formBuilder.group({
      artistic_name: ['', Validators.required],
      user_name: ['', Validators.required],
      user_id: [''],
      last_name: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      location: ['', Validators.required],
      discipline_name: [[]],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });

   }

  ngOnInit(): void {
    this.getDisciplines();
    this.route.params.subscribe(params => {
      if (params.id) {
        this.userService.getUserById(params.id).subscribe(user => {
          if (user) {
            this.user = user;
            this.registerForm.patchValue(user);
          }
          this.userId = params.id;
        });
      }
    });

  }

  getDisciplines(): void {
    this.userService.getDisciplines().subscribe(discipline => this.disciplines = discipline);
  }

  get loginForm() { return this.registerForm.controls }

  onSubmit(obj: any): void {

    this.submitted = true;

    if (this.registerForm.valid) {
      this.userService.saveUser(this.registerForm.value).subscribe(x => {
        if (x) {
          this.router.navigate(['artista/' + this.userId]);
        }
      });
    }
  }


}
