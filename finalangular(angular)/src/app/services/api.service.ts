import { Kategori } from 'src/app/models/Kategori';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Urun } from '../models/Urun';
import { kayit } from '../models/kayit';


@Injectable({
  providedIn: 'root'
})
export class apiService {
  apiUrl = "http://localhost:52939/api/";
  siteUrl = "http://localhost:52939/";

constructor(
  public http: HttpClient

) { }
  KategoriListe(){
  return this.http.get(this.apiUrl+"kategoriliste");
}

  KategoriById(kategoriId: string){
  return this.http.get(this.apiUrl+"kategoribyid/"+ kategoriId);
}

  KategoriEkle(kategori: Kategori){
  return this.http.post(this.apiUrl+"kategoriekle", kategori);
}

  KategoriDuzenle(kategori: Kategori){
  return this.http.put(this.apiUrl+"kategoriduzenle", kategori);
}

  KategoriSil(kategoriId: string){
  return this.http.delete(this.apiUrl+"kategorisil/" + kategoriId);
}



  UrunListe(){
  return this.http.get(this.apiUrl+"urunliste");
}

  UrunById(urunId: string){
  return this.http.get(this.apiUrl+"urunbyid/"+ urunId);
}

  UrunEkle(kategori: Kategori){
  return this.http.post(this.apiUrl+"urunekle/", kategori);
}

  UrunDuzenle(urun: Urun){
  return this.http.put(this.apiUrl+"urunduzenle", urun);
}

  UrunSil(kategoriId: string){
  return this.http.delete(this.apiUrl+"urunsil/" + kategoriId);
}


  KayitEkle(kayit : kayit){
  return this.http.post(this.apiUrl+"kayitekle", kayit);
}
  KayitSil(kayitId: string){
  return this.http.delete(this.apiUrl+"kayitsil/" + kayitId);
}

  
}


