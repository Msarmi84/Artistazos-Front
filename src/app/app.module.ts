import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/UI/header/header.component';
import { FooterComponent } from './shared/UI/footer/footer.component';
import { ArtistasFormComponent } from './artists/artistas-form/artistas-form.component';
import { LoginComponent } from './login/login.component';
import { AdvertisementComponent } from './artists/artist-single/advertisement/advertisement.component';
import { CompradorFormComponent } from './comprador/comprador-form/comprador-form.component';
import { ArtistsGridComponent } from './artists/artists-grid/artists-grid.component';
import { ArtistSingleComponent } from './artists/artist-single/artist-single.component';


// MATERIAL MODULES
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HomePageComponent } from './home-page/home-page.component';
import { MatCardModule } from '@angular/material/card';



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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
  ],
  // providers: [{
  //   provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true }
  // }],
  bootstrap: [AppComponent]
})
export class AppModule { }
