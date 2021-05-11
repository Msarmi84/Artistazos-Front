import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/_helpers/must-match.validator';


@Component({
  selector: 'app-artists-form',
  templateUrl: './artists-form.component.html',
  styleUrls: ['./artists-form.component.scss']
})
export class ArtistsFormComponent implements OnInit {

  registerForm: FormGroup;
  submitted: boolean = false;
  dateReg: RegExp = /^\d{2}[./-]\d{2}[./-]\d{4}$/;
  disciplines: Array<string> = [
    'Canto',
    'Música',
    'Fotografía',
    'Escritura',
    'Pintura',
    'Danza',
    'Teatro'
  ]

  seleccionados:string[]=[];
  

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      artistic_name: ['', [Validators.required]],
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      date_of_birth: ['', [Validators.pattern(this.dateReg)]],
      city: ['', [Validators.required]],
      presentation: ['', [Validators.required]],
      artistic_discipline: ['', [Validators.required]],
      artistic_cv: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      disciplines:[[]],
      avatar:['']
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });

    
  }

  get loginForm() { return this.registerForm.controls; }

  onSubmit() {
console.log(this.registerForm.value)

      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }

      alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
    }



}
