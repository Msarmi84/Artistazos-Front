import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/UI/header/header.component';
import { FooterComponent } from './shared/UI/footer/footer.component';
import { ArtistSingleComponent } from './artists/artist-single/artist-single.component';
import { ArtistsFormComponent } from './artists/artists-form/artists-form.component';
import { LoginComponent } from './login/login.component';
import { ArtistsGridComponent } from './artists/artists-grid/artists-grid.component';
import { CompradorFormComponent } from './comprador/comprador-form/comprador-form.component';
import { AdvertisementComponent } from './artists/advertisement/advertisement.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AllProductsComponent } from './products/all-products/all-products.component';
import { ArtistsComponent } from './artists/artists.component';
import { SearcherComponent } from './searcher/searcher.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { InfoComponent } from './shared/UI/info/info.component';
import { ProductsFormUpdateComponent } from './products/products-form-update/products-form-update.component';
import { CartComponent } from './cart/cart.component';
import { ValidCredentialsComponent } from './valid-credentials/valid-credentials.component';
import { safeUrlPipe } from './safeurl.pipe.ts.pipe';
import { ArtistDisciplineComponent } from './artists/artist-discipline/artist-discipline.component';



// MATERIAL MODULES
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArtistsFormUpdateComponent } from './artists/artists-form-update/artists-form-update.component';
import { AdminComponent } from './admin/admin.component';
import { ProductsModalComponent } from './products/products-modal/products-modal.component';
import { SafeurlPipe } from './safeurl.pipe';
import { AdvertisementFormComponent } from './advertisement-form/advertisement-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ArtistSingleComponent,
    ArtistsFormComponent,
    LoginComponent,
    ArtistsGridComponent,
    CompradorFormComponent,
    HomePageComponent,
    AllProductsComponent,
    SearcherComponent,
    ArtistsComponent,
    AdvertisementComponent,
    ArtistsFormUpdateComponent,
    ProductsFormUpdateComponent,
    CartComponent,
    ValidCredentialsComponent,
    InfoComponent,
    AdminComponent,
    ProductsModalComponent,
    SafeurlPipe,
    AdvertisementFormComponent



  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    NgxPaginationModule,
    MatSelectModule,
  ],
  // providers: [{
  //   provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true }
  // }],
  bootstrap: [AppComponent]
})
export class AppModule { }
