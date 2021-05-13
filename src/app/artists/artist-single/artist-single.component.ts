import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { InfoComponent } from 'src/app/shared/UI/info/info.component';
import { ArtistsFormUpdateComponent } from '../artists-form-update/artists-form-update.component';
import { ProductsFormUpdateComponent } from 'src/app/products/products-form-update/products-form-update.component';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/products/product.service';
import { Disciplines } from 'src/app/models/disciplines';
import { Subscription } from 'rxjs';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { CompleteArtistsFormComponent } from '../complete-artists-form/complete-artists-form.component';



@Component({
  selector: 'app-artist-single',
  templateUrl: './artist-single.component.html',
  styleUrls: ['./artist-single.component.scss'],
})
export class ArtistSingleComponent implements OnInit, OnDestroy {
  user: User;
  userId: number;
  product: Product;
  products: Product[];
  disciplines: Disciplines[]
  imageUrl = environment.baseUrl + 'images/';
  defaultImage = 'assets/images/logonofoto.png';
  imageFile: File;
  imgPreview = 'assets/images/logonofoto.png';
  

  seeEditArtist = false;
  txtBoton = 'EDITAR PERFIL';
  editprofileComplete: boolean = false;
  editProfile: boolean = false;
  iconEdit: boolean = false;
  openModel: boolean = false;
  isLoggedIn: boolean = false;
  isLoggedSub: Subscription;
  page: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private productService: ProductService,
    private dialog: MatDialog,
    private lss: LocalStorageService
  ) {}

  ngOnInit(): void {
    // this.route.params.subscribe(params => this.getUser(params.id));
    this.route.params.subscribe((params) => (this.userId = params.id));
    this.getUser(this.userId);

    this.getProducts(this.userId);
    this.getDisciplinesByUserId(this.userId);
    this.isLoggedSub = this.lss.isLoggedIn.subscribe(loggedIn => this.isLoggedIn = loggedIn);

  }

  getUser(id: number): void {
    this.userService.getUserById(id).subscribe((x) => {
      this.user = x;
  });
  }

  getProducts(id: number): void {
    this.productService.getProductsByUserId(id).subscribe((x) => {
      this.products = x;
    });
  }

  //devuelve las disciplinas del usuario
  getDisciplinesByUserId(id: number):void {
    this.userService.getDisciplinesById(id).subscribe(disciplines => {
       this.disciplines = disciplines;
    })
  }

  deleteUser(): void {
    const dialogRef = this.dialog.open(InfoComponent, {
      width: '400px',
      height: '300px',
      data: 'Estas seguro?',
    });
    console.log(dialogRef);
    dialogRef.afterClosed().subscribe((isConfirmed) => {
      if (!isConfirmed) {
        return;
      }
      this.userService.deleteUser(this.user.user_id).subscribe((res) => {
        this.router.navigateByUrl('/artists-form');
      });
    });
  }
  editProfileComplete(user) {
    this.user = user;


    if (this.user) {
      const dialogRef = this.dialog.open(CompleteArtistsFormComponent, {
        data: this.user,
        width: '80%',
      });

      dialogRef.afterClosed().subscribe((user) => {
        this.userService
          .saveUser(this.user)
          .subscribe((updatedUser) => (this.user = updatedUser));
      });
      this.user = null;
    } else {
      const dialogRef = this.dialog.open(CompleteArtistsFormComponent, {
        data: this.user,
        width: '80%',
      });

      // dialogRef.afterClosed().subscribe((user) => {
      //   this.userService
      //     .updateUser(user, this.user.user_id)
      //     .subscribe((seeEditProfile) => (this.user = seeEditProfile));
      // });
    }
  }
  


  changeToArtist(): void {
    this.seeEditArtist = !this.seeEditArtist;
  }

  seeEditProfile(product) {
    this.product = product;


    if (this.product) {
      const dialogRef = this.dialog.open(ProductsFormUpdateComponent, {
        data: this.product,
        width: '80%',
      });

      dialogRef.afterClosed().subscribe((user) => {
        this.productService
          .saveProduct(this.product)
          .subscribe((updatedProduct) => (this.product = updatedProduct));
      });
      this.product = null;
    } else {
      const dialogRef = this.dialog.open(ArtistsFormUpdateComponent, {
        data: this.user,
        width: '80%',
      });

      dialogRef.afterClosed().subscribe((user) => {
        this.userService
          .updateUser(user, this.user.user_id)
          .subscribe((seeEditProfile) => (this.user = seeEditProfile));
      });
    }
  }

  onImageChanged(event: InputEvent): void {
    const inputTarget = event.target as HTMLInputElement;
    const file = inputTarget.files[0];
    this.imageFile = file;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => (this.imgPreview = fileReader.result as string);
  }

  editProduct(): void {
    this.iconEdit = !this.iconEdit;
  }

  // saveProduct(product:FormData): void {
  //   this.productService.saveProduct(product).subscribe(() => this.getProducts(product.id));
  // }

  logout(): void {
    this.lss.removeUserToken();
  }

  ngOnDestroy(): void {
    this.isLoggedSub.unsubscribe();
  }
}
