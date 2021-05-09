import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/UI/header/header.component';
import { FooterComponent } from './shared/UI/footer/footer.component';
import { ArtistSingleComponent } from './artists/artist-single/artist-single.component';
import { ArtistasFormComponent } from './artists/artistas-form/artistas-form.component';
import { LoginComponent } from './login/login.component';
import { ArtistsGridComponent } from './artists/artists-grid/artists-grid.component';
import { AdvertisementComponent } from './artists/advertisement/advertisement.component';

import { CompradorFormComponent } from './comprador/comprador-form/comprador-form.component';
// MATERIAL MODULES
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HomePageComponent } from './home-page/home-page.component';
import { AllProductsComponent } from './productos/all-products/all-products.component';
import { BuscadorComponent } from './buscador/buscador.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ArtistSingleComponent,
    ArtistasFormComponent,
    LoginComponent,
    ArtistsGridComponent,
    AdvertisementComponent,
    CompradorFormComponent,
    HomePageComponent,
    AllProductsComponent,
    BuscadorComponent

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
  ],
  // providers: [{
  //   provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true }
  // }],
  bootstrap: [AppComponent]
})
export class AppModule { }
