import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistSingleComponent } from './artists/artist-single/artist-single.component';
import { ArtistsFormComponent } from './artists/artists-form/artists-form.component';
import { ArtistsGridComponent } from './artists/artists-grid/artists-grid.component';
import { SearcherComponent } from './searcher/searcher.component';
import { PurchaserFormComponent } from './purchaser-form/purchaser-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { AllProductsComponent } from './products/all-products/all-products.component';
import { AuthGuard } from './services/auth.guard';
import { CartComponent } from './cart/cart.component';
import { AdminComponent } from './admin/admin.component';
import { ArtistDisciplineComponent } from './artists/artist-discipline/artist-discipline.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';

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
    path: 'checkout/success', component: PaymentSuccessComponent,
  },
  {
    path: 'purchaser-form', component: PurchaserFormComponent,
  },
  {
    path: '', component: HomePageComponent,
  },
  {
    path: 'products', component: AllProductsComponent,
  },
  {
    path: 'buscar', component: SearcherComponent,
  },
  {
    path: 'cart', component: CartComponent,
  },
  {
    path: 'artists-form/:id', component: ArtistsFormComponent
  },
  {
    path: 'admin', component: AdminComponent
  },
  {
    path: 'artist-discipline/:discipline', component: ArtistDisciplineComponent
  },
  {
    path: '**', component: NotFoundComponent
  },
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
