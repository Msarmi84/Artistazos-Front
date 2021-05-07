import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/UI/header/header.component';
import { FooterComponent } from './shared/UI/footer/footer.component';
import { ArtistaSingleComponent } from './artistas/artista-single/artista-single.component';
import { ArtistasFormComponent } from './artistas/artistas-form/artistas-form.component';
import { LoginComponent } from './login/login.component';
import { ArtistasGridComponent } from './artistas/artistas-grid/artistas-grid.component';
import { AnuncioPymeComponent } from './artistas/artista-single/anuncio-pyme/anuncio-pyme.component';
import { CompradorFormComponent } from './comprador/comprador-form/comprador-form.component';
// MATERIAL MODULES
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { HomePageComponent } from './home-page/home-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ArtistaSingleComponent,
    ArtistasFormComponent,
    LoginComponent,
    ArtistasGridComponent,
    AnuncioPymeComponent,
    CompradorFormComponent,
    HomePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
