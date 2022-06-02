import { KategoriDialogComponent } from './../dialogs/kategori-dialog/kategori-dialog.component';
import { Sonuc } from './../../models/Sonuc';
import { MatButtonModule } from '@angular/material/button';
import { MyAlertService } from './../../services/MyAlert.service';
import { apiService} from './../../services/api.service';
import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Kategori } from 'src/app/models/Kategori';
import { Urun } from 'src/app/models/Urun';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-kategori',
  templateUrl: './kategori.component.html',
  styleUrls: ['./kategori.component.scss']
})
export class KategoriComponent implements OnInit {
  kategoriler:Kategori[];
  urunler:Urun[];
  kategoriId:string;
  dataSource : any;
  displayedColumns=['kategoriAd','islemler'];
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogRef:MatDialogRef<KategoriDialogComponent>;
  ConfirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis:apiService,
    public alert:MyAlertService,
    public matDialog: MatDialog
  )  { }

  

  ngOnInit() {
    this.KategoriListele();
    
  }
  KategoriListele(){
    this.apiServis.KategoriListe().subscribe((d:Kategori[])=>{
      this.kategoriler = d;
      this.dataSource = new MatTableDataSource(d);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator=this.paginator;
    });
  }
  Filtrele(e){
    var deger=e.target.value;
    this.dataSource.filter=deger.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
   }
   Ekle(){
    var yeniKayit:Kategori=new Kategori();
    this.dialogRef=this.matDialog.open(KategoriDialogComponent,{
      width:'400px',
      data:{
        kayit:yeniKayit,
        islem:'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d) {
        this.apiServis.KategoriEkle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.KategoriListele();
          }
        });
      }
    });
}
  Duzenle(kayit: Kategori){
    this.dialogRef=this.matDialog.open(KategoriDialogComponent,{
      width:'400px',
      data:{
        kayit:kayit,
        islem:'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){
        d.kategoriId=kayit.kategoriId;
        this.apiServis.KategoriDuzenle(d).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.KategoriListele();
          }
        });
      }
    });

  }
  Sil(kayit:Kategori){
    this.ConfirmDialogRef=this.matDialog.open(ConfirmDialogComponent,{
      width:'600px'
    }); 
  
    this.ConfirmDialogRef.componentInstance.dialogMesaj=kayit.kategoriAd+ "  " + kayit.kategoriAd + "  --> Bu Ders Silinecektir Onaylıyor Musunuz ?"
    this.ConfirmDialogRef.afterClosed().subscribe(d=>{
      if (d) {
        this.apiServis.KategoriSil(kayit.kategoriId).subscribe((s:Sonuc)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.KategoriListele();
          }
        });
      }
    });
  }
}

  
