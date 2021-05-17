import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Subscription } from 'rxjs';
import { getUserFromToken, isAdmin } from 'src/app/_helpers/tokenHelper';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  user;
  isLoggedIn: boolean = false;
  isLoggedSub: Subscription;
  profileRoute: string;

  constructor(private lss: LocalStorageService) { }

  ngOnInit(): void {
    this.isLoggedSub = this.lss.isLoggedIn.subscribe(loggedIn => this.isLoggedIn = loggedIn);
    this.user = getUserFromToken()
    this.profileRoute = isAdmin() ? '/admin' : `/artista/${this.user.user_id}`
  }

  logout(): void {
    this.lss.removeUserToken();
  }

  ngOnDestroy(): void {
    this.isLoggedSub.unsubscribe();
  }

}
