import { Component, OnInit } from '@angular/core';
import { getUserFromToken } from '../_helpers/tokenHelper';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  admin = {}; 

  constructor() { }

  ngOnInit(): void {
    const adminData = getUserFromToken();
    this.admin = adminData.type === 3 ? adminData : undefined; 
  }

}
