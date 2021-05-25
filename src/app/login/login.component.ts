import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { getUserFromToken } from '../_helpers/tokenHelper';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  constructor(
    fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private lss: LocalStorageService
  ) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
   }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.loginService.login(this.form.value).subscribe(
      () => getUserFromToken().type === 3 ? this.router.navigate(['/admin']) : this.router.navigate(['/artistas']),
      (error) => this.form.setErrors({ userNotFound: error.error })
    );
      this.lss.deleteCart();
  }
}
