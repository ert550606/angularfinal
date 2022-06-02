import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from './../../models/Sonuc';
import { MyAlertService } from './../../services/MyAlert.service';
import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { apiService } from './../../services/api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { kayit } from './../../models/kayit';
import { Urun } from 'src/app/models/Urun';
import { Kategori } from 'src/app/models/Kategori';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { UrunDialogComponent } from '../dialogs/urun-dialog/urun-dialog.component';

@Component({
  selector: 'app-urun',
  templateUrl: './urun.component.html',
  styleUrls: ['./urun.component.scss']
})
export class UrunComponent implements OnInit {
  kategoriler:Kategori[];
  urunler:Urun[];
  urunId:string;
  kayitlar:kayit[];
  kategoriId:string;
  dersId:string;
  dataSource : any;
  displayedColumns=['urunAd','urunStok','urunFiyat','islemler'];
  
  
  
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogRef:MatDialogRef<UrunDialogComponent>;
  ConfirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis:apiService,
    public alert:MyAlertService,
    public matDialog: MatDialog
  ) { }

  

  ngOnInit() {
    this.KategoriListele();

  }

  UrunListele(){
    this.apiServis.UrunListe().subscribe((d:Urun[])=>{
      this.urunler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    });
  }
  KategoriListele(){
    this.apiServis.KategoriListe().subscribe((d:Kategori[])=>{
      this.kategoriler=d;
    });
  }
  KategoriSec(kategori:Kategori){
    this.kategoriId=kategori.kategoriId;
    this.UrunListele();
  }
  Filtrele(e){
    var deger=e.target.value;
    this.dataSource.filter=deger.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
   }
   Ekle(){
    var yeniKayit:Urun = new Urun();
    this.dialogRef=this.matDialog.open(UrunDialogComponent,{
      width:'400px',
      data:{
        kayit:yeniKayit,
        islem:'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d) {
        console.log(d);

        this.apiServis.UrunEkle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.UrunListele();
          }
        });
      }
    });
}
  Duzenle(kayit: Kategori){
    this.dialogRef=this.matDialog.open(UrunDialogComponent,{
      width:'400px',
      data:{
        kayit:kayit,
        islem:'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){
        d.dersId=kayit.kategoriId;
        this.apiServis.UrunDuzenle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.UrunListele();
          }
        });
      }
    });

  }

}