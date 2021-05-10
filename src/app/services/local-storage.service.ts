import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private readonly AP_TKN = 'AP_TKN';

  private isLoggedIn$: BehaviorSubject<boolean>;

  constructor(private router: Router) {
    this.isLoggedIn$ = new BehaviorSubject(this.isAuthenticated());
  }

  get isLoggedIn(): Observable<boolean> {
    return this.isLoggedIn$.asObservable();
  }

  saveUserToken(token: string): void {
    localStorage.setItem(this.AP_TKN, JSON.stringify(token));
    this.isLoggedIn$.next(true);
  }

  getUserToken(): string {
    const token = localStorage.getItem(this.AP_TKN);
    return JSON.parse(token) || null;
  }

  removeUserToken(): void {
    localStorage.removeItem(this.AP_TKN);
    this.isLoggedIn$.next(false);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.AP_TKN);
  }
}
