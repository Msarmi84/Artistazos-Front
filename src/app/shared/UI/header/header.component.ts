import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {


  isLoggedIn: boolean = false;
  isLoggedSub: Subscription;

  constructor(private lss: LocalStorageService) { }

  ngOnInit(): void {
    this.isLoggedSub = this.lss.isLoggedIn.subscribe(loggedIn => this.isLoggedIn = loggedIn);
  }

  logout(): void {
    this.lss.removeUserToken();
  }

  ngOnDestroy(): void {
    this.isLoggedSub.unsubscribe();
  }

}
