import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistaSingleComponent } from './artistas/artista-single/artista-single.component';
import { ArtistasFormComponent } from './artistas/artistas-form/artistas-form.component';
import { ArtistasGridComponent } from './artistas/artistas-grid/artistas-grid.component';
import { CompradorFormComponent } from './comprador/comprador-form/comprador-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { AllProductsComponent } from './productos/all-products/all-products.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent,
  },
  {
    path: 'artista/:id', component: ArtistaSingleComponent,
  },
  {
    path: 'artistas-grid', component: ArtistasGridComponent,
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