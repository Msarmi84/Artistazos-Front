import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;


  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router,) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });

  }

  get loginForm() { return this.registerForm.controls; }

  // onSubmit() {
  //     this.submitted = true;

  //     // stop here if form is invalid
  //     if (this.registerForm.invalid) {
  //         return;
  //     }

  //     alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  //   }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.loginService.login(this.registerForm.value).subscribe(
      () => this.router.navigate(['/artistas']),
      (error) => this.registerForm.setErrors({ userNotFound: error.error })
    );
  }

}
