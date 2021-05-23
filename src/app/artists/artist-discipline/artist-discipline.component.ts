import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-artist-discipline',
  templateUrl: './artist-discipline.component.html',
  styleUrls: ['./artist-discipline.component.scss']
})
export class ArtistDisciplineComponent implements OnInit {


  user: User[];
  disciplineId: number;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      return this.disciplineId = parseInt(params.discipline)});
    this.getUserByDiscipline(this.disciplineId);
  }
  getUserByDiscipline(disciplineId: number): void {
    this.userService.getUsersByDiscipline(disciplineId).subscribe((x) => {
      this.user = x;
    });
  }

}
