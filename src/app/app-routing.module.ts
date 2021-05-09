import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistSingleComponent } from './artists/artist-single/artist-single.component';
import { ArtistasFormComponent } from './artists/artistas-form/artistas-form.component';
import { ArtistsGridComponent } from './artists/artists-grid/artists-grid.component';
import { BuscadorComponent } from './buscador/buscador.component';
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
    path: 'artistas', component: ArtistsGridComponent,
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
    path: 'productos', component: AllProductsComponent,
  },
  {
    path: 'buscar', component: BuscadorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
