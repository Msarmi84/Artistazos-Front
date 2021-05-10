import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private lss: LocalStorageService, private router: Router) {}

  canActivate(): boolean {
    if (this.lss.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/login']);
  }
}
