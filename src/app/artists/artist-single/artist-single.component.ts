import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { ArtistsFormComponent } from '../artists-form/artists-form.component';
import { InfoComponent } from 'src/app/shared/UI/info/info.component';
import { ArtistsFormUpdateComponent } from '../artists-form-update/artists-form-update.component';




@Component({
  selector: 'app-artist-single',
  templateUrl: './artist-single.component.html',
  styleUrls: ['./artist-single.component.scss']
})
export class ArtistSingleComponent implements OnInit {

  user: User;
  imageUrl = environment.baseUrl + 'images/';
  defaultImage = 'assets/images/logonofoto.png';
  imageFile: File;
  imgPreview = 'assets/images/logonofoto.png';


  seeEditArtist = false;
  txtBoton = 'EDITAR PERFIL';


  editProfile: boolean = false ;



  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => this.getUser(params.id));
  }
  getUser(id: string): void {
    this.userService.getUserById(id).subscribe(user => this.user = user);
  }
  deleteUser(): void {
    const dialogRef = this.dialog.open(InfoComponent, {
      width: '400px',
      height: '300px',
      data: 'Estas seguro?'
     });
    dialogRef.afterClosed().subscribe(isConfirmed => {
      if (!isConfirmed) {
        return;
      }

      this.userService.deleteUser(this.user.user_id).subscribe(res => {
        this.router.navigateByUrl('/artists-form');
      });
    });
  }
  updateUser(): void {
    const dialogRef = this.dialog.open(ArtistsFormComponent, {
      data: this.user,
      width: '80%'
    });

    dialogRef.afterClosed().subscribe(user => {
      this.userService.updateUser(user, this.user.user_id)
        .subscribe(updatedUser => this.user = updatedUser);
    });
  }
  changeToArtist(): void {
    this.seeEditArtist = !this.seeEditArtist;
  }

  // editProfileClick(): void {
  //   this.editProfile = true;
  // }


  seeEditProfile() {
    // this.editProfile = true;
    const dialogRef = this.dialog.open(ArtistsFormUpdateComponent, {
      data: this.user,
      width: '80%'
    });

    dialogRef.afterClosed().subscribe(user => {
      this.userService.updateUser(user, this.user.user_id)
        .subscribe(seeEditProfile => this.user = seeEditProfile);
    });

  }
  onImageChanged(event: InputEvent): void {
    const inputTarget = event.target as HTMLInputElement;
    const file = inputTarget.files[0];
    this.imageFile = file;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => this.imgPreview = fileReader.result as string;
  }



}
