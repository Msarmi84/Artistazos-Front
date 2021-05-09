import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistSingleComponent } from './artistas/artist-single/artist-single.component';
import { ArtistasFormComponent } from './artistas/artistas-form/artistas-form.component';
import { ArtistsGridComponent } from './artistas/artists-grid/artists-grid.component';
import { CompradorFormComponent } from './comprador/comprador-form/comprador-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { AllProductsComponent } from './productos/all-products/all-products.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'artista/:id', component: ArtistSingleComponent,
  },
  {
    path: 'artists-grid', component: ArtistsGridComponent,
  },
  {
    path: 'artistas-form', component: ArtistasFormComponent,
  },
  {
    path: 'comprador-form', component: CompradorFormComponent,
  },
  {
    path: '', component: HomePageComponent,
  },
  {
    path: 'productos', component: AllProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
