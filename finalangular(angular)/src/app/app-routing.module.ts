import { UrunlerComponent } from './components/urunler/urunler.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { UrunComponent } from './components/urun/urun.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path:'kategori',
    component: KategoriComponent
  },
  {
    path:'urun',
    component: UrunComponent
  },
  {
    path:'urunler',
    component: UrunlerComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
