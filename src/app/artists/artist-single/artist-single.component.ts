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
import { ValidCredentialsComponent } from 'src/app/valid-credentials/valid-credentials.component';
import { ProductsModalComponent } from 'src/app/products/products-modal/products-modal.component';




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
  imageUrl = environment.baseUrl + 'images/uploads/';
  defaultImage = this.imageUrl + 'defaultProduct' ;
  imageFile: File;
  imgPreview = 'assets/images/logonofoto.png';
  defaultImg = 'assets/images/logonofoto.png';




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

    this.route.params.subscribe((params) => (this.userId = parseInt(params.id)));
    this.getUser(this.userId);
    this.getProducts(this.userId);
    this.getDisciplinesByUserId(this.userId);


    this.isLoggedSub = this.lss.isLoggedIn.subscribe(loggedIn => this.isLoggedIn = loggedIn);

  }

  //obtiene la información del artista
  getUser(id: number): void {
    this.userService.getUserById(id).subscribe((x) => {
      this.user = x;
  });
  }

  //obtiene la información de los productos de dicho artista
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
        console.log(' no ha confirmado')
        return;
      }

      this.userService.deleteUser(this.user.user_id).subscribe(res => {
        this.router.navigateByUrl('/artistas');

      });
    });
  }

  // editCredentials(user) {
  //   this.user = user;


  //   if (this.user) {
  //     const dialogRef = this.dialog.open(ValidCredentialsComponent, {
  //       data: this.user,
  //       width: '80%',
  //     });

  //     dialogRef.afterClosed().subscribe((user) => {
  //       this.userService
  //         .saveUser(this.user)
  //         .subscribe((updatedUser) => (this.user = updatedUser));
  //     });
  //     this.user = null;
  //   } else {
  //     const dialogRef = this.dialog.open(ValidCredentialsComponent, {
  //       data: this.user,
  //       width: '80%',
  //     });

  //     dialogRef.afterClosed().subscribe((user) => {
  //       this.userService
  //         .updateUser(user, this.user.user_id)
  //         .subscribe((seeEditProfile) => (this.user = seeEditProfile));
  //     });
  //   }
  // }



  changeToArtist(): void {
    this.seeEditArtist = !this.seeEditArtist;
  }


  //Abre y cierra los formularios de edición de usuario y producto
  seeEditProfile(obj: any) {
    this.product = obj;
    console.log('console del producto')
    console.log(this.product, '--------')

    //Abre el formulario de edición de product en el que también se puede añadir un nuevo producto
    if (this.product) {
      const dialogRef = this.dialog.open(ProductsFormUpdateComponent, {
        data: this.product,
        width: '80%',
      });

      //Después de cerrarlo hacemos la petición http para guardar el producto nuevo o editado
      dialogRef.afterClosed().subscribe((products) => {
        this.productService
          .saveProduct(products)
          .subscribe((updatedProduct) => {
            this.product = updatedProduct;
            this.getProducts(this.userId);
          });
      });
    } else {
      //Abre el formulario de edición de artista
      const dialogRef = this.dialog.open(ArtistsFormUpdateComponent, {
        data: this.user,
        width: '80%',
      });
      // después de cerrarlo hacemos la petición http para  guardar el usuario modificado
      dialogRef.afterClosed().subscribe((user) => {

        this.userService
          .updateUser(user, this.userId)
          .subscribe((editUser) => {
            this.user = editUser;
            this.getUser(this.userId);
            this.getDisciplinesByUserId(this.userId);
          });
        });
    }
  }

  editProduct(): void {
    this.iconEdit = !this.iconEdit;
  }
//abre la descripcion,imagen y nombre en un modal del proucto
  seeEditProduct(obj: Product) {
    this.product = obj;
    //Abre el formulario de edición de product en el que también se puede añadir un nuevo producto
    if (this.product) {
      const dialogRef = this.dialog.open(ProductsModalComponent, {
        data: this.product,
        width: '40%',
      });
    } 
  }

  logout(): void {
    this.lss.removeUserToken();
  }

  ngOnDestroy(): void {
    this.isLoggedSub.unsubscribe();
  }


}
