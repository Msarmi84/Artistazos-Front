import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistSingleComponent } from './artists/artist-single/artist-single.component';
import { ArtistsFormComponent } from './artists/artists-form/artists-form.component';
import { ArtistsGridComponent } from './artists/artists-grid/artists-grid.component';
import { SearcherComponent } from './searcher/searcher.component';
import { CompradorFormComponent } from './comprador/comprador-form/comprador-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { AllProductsComponent } from './products/all-products/all-products.component';
import { AuthGuard } from './services/auth.guard';

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
    path: 'artists-form', component: ArtistsFormComponent,
  },
  {
    path: 'comprador-form', component: CompradorFormComponent,
  },
  {
    path: '', component: HomePageComponent,
  },
  {
    path: 'products', component: AllProductsComponent,
  },
  {
    path: 'buscar', component: SearcherComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
