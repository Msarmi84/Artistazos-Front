import { Component, OnInit, OnDestroy, Pipe } from '@angular/core';
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
import { getUserFromToken, isAdmin } from '../../_helpers/tokenHelper';
import { DomSanitizer } from '@angular/platform-browser';
import { AdvertisementService } from 'src/app/advertisement.service';
import { Advertisement } from 'src/app/models/advertisement';
import { PaymentService } from 'src/app/services/payment.service';


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
  productsImg: Product[] = [];
  productsPdf: Product[] = [];
  productsVideo: Product[] = [];
  productsSound: Product[] = [];
  disciplines: Disciplines[];
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
  pageImg:number=1;
  pageVideo: number = 1;
  pagePdf:number=1;
  productImg = '';
  productsImg2 = new Array();
  currentUser;
  isAdmin: boolean = false;
  productCart: number;
  dangerousUrl: string;
  trustedUrl: any;
  advertisementsByLocation: Advertisement[] = [];

  productsComprados: Product[] = [];
  productsCompradosImg: Product[] = [];
  productsCompradosPdf: Product[] = [];
  productsCompradosVideo: Product[] = [];
  productsCompradosSound: Product[] = [];




  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private productService: ProductService,
    private dialog: MatDialog,
    private lss: LocalStorageService,
    private sanitizer: DomSanitizer,
    private advertisemenService: AdvertisementService,
    private paymentService: PaymentService

    ) { }



    ngOnInit(): void {

      this.route.params.subscribe((params) => (this.userId = parseInt(params.id)));
      this.getUser(this.userId);
      this.getProducts(this.userId);
      this.getDisciplinesByUserId(this.userId);

      this.getCompras(this.userId);
      

      this.currentUser = getUserFromToken();
      this.isAdmin = isAdmin();


      // this.dangerousUrl = 'http://localhost:3000/pdf/uploads/' + this.product.product_photo;
      // this.trustedUrl = this.sanitizer.bypassSecurityTrustUrl(this.dangerousUrl);

    this.isLoggedSub = this.lss.isLoggedIn.subscribe(loggedIn => this.isLoggedIn = loggedIn);
  }

  //obtiene la informaci??n del artista
  getUser(id: number): void {
    this.userService.getUserById(id).subscribe((x) => {
      this.user = x;
      this.getAdvertisementsByLocation(this.user.location);
  });
  }



  //obtiene la informaci??n de los productos de dicho artista
  getProducts(id: number): void {
    this.productService.getProductsByUserId(id).subscribe((x) => {
      // Antes de nada, limpiamos los arrays: como vamos a hacer
      // push con los productos, y si no lo limpiamos se a??aden
      // cosas repetidas.
      this.productsImg = [];
      this.productsVideo = [];
      this.productsPdf = [];
      this.products = x;
      for(let i=0; i<this.products.length; i++) {
        this.productImg = this.products[i].product_photo.split('.')[1];
        // this.productsImg.push(this.productImg)
        // console.log(this.productImg);
        if (this.productImg === 'jpg'|| this.productImg === 'jpeg' || this.productImg === 'png') {
          this.productsImg.push(this.products[i]);
        }
        else if (this.productImg === 'mp4'|| this.productImg === 'mp3') {
          this.productsVideo.push(this.products[i]);
        }
        else if (this.productImg === 'pdf') {
          this.productsPdf.push(this.products[i]);
        }
      }
      // console.log(this.productsPdf);
    });

  }
  getCompras(id: number): void {
    this.paymentService.getPurchases().subscribe((x) => {
      // Antes de nada, limpiamos los arrays: como vamos a hacer
      // push con los productos, y si no lo limpiamos se a??aden
      // cosas repetidas.
      this.productsCompradosImg = [];
      this.productsCompradosVideo = [];
      this.productsCompradosPdf = [];
      this.productsComprados = x;
      for(let i=0; i<this.productsComprados.length; i++) {
        this.productImg = this.productsComprados[i].product_photo.split('.')[1];
        // this.productsCompradosImg.push(this.productImg)
        // console.log(this.productImg);
        if (this.productImg === 'jpg'|| this.productImg === 'jpeg' || this.productImg === 'png') {
          this.productsCompradosImg.push(this.productsComprados[i]);
        }
        else if (this.productImg === 'mp4'|| this.productImg === 'mp3') {
          this.productsCompradosVideo.push(this.productsComprados[i]);
        }
        else if (this.productImg === 'pdf') {
          this.productsCompradosPdf.push(this.productsComprados[i]);
        }
      }
      console.log(this.productsCompradosPdf);
    });

  }

  //devuelve las disciplinas del usuario
  getDisciplinesByUserId(id: number):void {
    this.userService.getDisciplinesById(id).subscribe(disciplines => {
       this.disciplines = disciplines;
    })
  }

  getAdvertisementsByLocation(location:string):void {
    this.advertisemenService.getAdvertisementsByLocation(location).subscribe(x => {
      this.advertisementsByLocation = x
      console.log(this.advertisementsByLocation, 'anunciosss filtrados');
    })
  }

  // selectAdvertisements():void {
  //   for(let i = 0; i < this.advertise)
  // }

  deleteUser(): void {
    const dialogRef = this.dialog.open(InfoComponent, {
      width: '400px',
      height: '450px',
      data: 'Seguro que quieres eliminar tu perfil?',
    });
    console.log(dialogRef);
    dialogRef.afterClosed().subscribe((isConfirmed) => {
      if (!isConfirmed) {
        console.log(' no ha confirmado')
        return;
      }

      this.userService.deleteUser(this.user.user_id).subscribe(res => {
        this.router.navigateByUrl('/artistas');
        this.lss.removeUserToken();

      });
    });
  }
  deleteProduct (product_id): void {
    const dialogRef = this.dialog.open(InfoComponent, {
      width: '400px',
      height: '450px',
      data: 'Seguro que quieres eliminar este producto?',
    });
    console.log(dialogRef);
    dialogRef.afterClosed().subscribe((isConfirmed) => {
      if (!isConfirmed) {
        console.log(' no ha confirmado');
        return;
      }

      this.productService.deleteProduct(product_id).subscribe(res => {
        this.getProducts(this.userId);
      });
    });
  }


  changeToArtist(): void {
    this.seeEditArtist = !this.seeEditArtist;
  }


  //Abre y cierra los formularios de edici??n de usuario y producto
  seeEditProfile(obj: any, type: string) {
    this.product = obj;
    console.log('console del producto')
    console.log(this.product, '--------')


    //Abre el formulario de edici??n de product en el que tambi??n se puede a??adir un nuevo producto
    if (this.product) {
      const dialogRef = this.dialog.open(ProductsFormUpdateComponent, {
        data:{product: this.product, type},
        width: '80%',
      });

      //Despu??s de cerrarlo hacemos la petici??n http para guardar el producto nuevo o editado
      dialogRef.afterClosed().subscribe((products) => {
        this.productService
          .saveProduct(products)
          .subscribe((updatedProduct) => {
            this.product = updatedProduct;
            this.getProducts(this.userId);
          },
          (error) => {
            // Si hay un error al subir el producto
            // se muestra el mensaje
            alert("Archivo no v??lido.")
          });
      });
    } else {
      //Abre el formulario de edici??n de artista
      const dialogRef = this.dialog.open(ArtistsFormUpdateComponent, {
        data: this.user,
        width: '80%',

      });
      // despu??s de cerrarlo hacemos la petici??n http para  guardar el usuario modificado
      dialogRef.afterClosed().subscribe((user) => {
        if (!user) {
          // Se ha cerrado el modal sin guardar, no hacemos nada
          // para que no salga como undefined
          return;
        }
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
    //Abre el formulario de edici??n de product en el que tambi??n se puede a??adir un nuevo producto
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

  addProduct(product:Product):void {

   let products = {product_id : product.product_id, amount: 1}
    this.lss.saveProduct(products);

  }


}
