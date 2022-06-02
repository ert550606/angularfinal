import { UrunDialogComponent } from './../dialogs/urun-dialog/urun-dialog.component';
import { Sonuc } from 'src/app/models/Sonuc';
import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { Urun } from 'src/app/models/Urun';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { apiService } from 'src/app/services/api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MyAlertService } from 'src/app/services/MyAlert.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-urunler',
  templateUrl: './urunler.component.html',
  styleUrls: ['./urunler.component.scss']
})
export class UrunlerComponent implements OnInit {
  urunler:Urun[];
  displayedColumns=['urunAd','urunStok','urunFiyat','islemler'];
  dataSource: any;
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator:MatPaginator;
  dialogRef:MatDialogRef<UrunDialogComponent>;
 
  ConfirmDialogRef:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis:apiService,
    public matDialog:MatDialog,
    public alert:MyAlertService
  ) { }

  ngOnInit() {
    this.OgrenciListele();
  }
 OgrenciListele(){
   this.apiServis.UrunListe().subscribe((d:Urun[])=>{
    this.urunler = d;
    this.dataSource=new MatTableDataSource(this.urunler);
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
   var yeniKayit:Urun=new Urun();
   this.dialogRef=this.matDialog.open(UrunDialogComponent,{
     width:'400px',
     data:{
       kayit:yeniKayit,
       islem:'ekle'
     }
   });

   this.dialogRef.afterClosed().subscribe(d=>{
     if(d){
      this.apiServis.UrunEkle(d).subscribe((s:Sonuc)=>{
        this.alert.AlertUygula(s);
        if(s.islem){
        this.OgrenciListele();
      }
    });
    }
   });

  }
  Duzenle(kayit:Urun){
    this.dialogRef=this.matDialog.open(UrunDialogComponent,{
      width:'400px',
      data:{
        kayit: kayit,
        islem:'duzenle'
      }
    });

    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){
      kayit.urunId=d.urunId;
      kayit.urunAd=d.urunAd;
      kayit.urunFiyat=d.urunFiyat;
      kayit.urunStok=d.urunStok;

      this.apiServis.UrunDuzenle(kayit).subscribe((s:Sonuc)=>{
        this.alert.AlertUygula(s);
      });
      }

     });
    }
     
    
    Sil(kayit: Urun){
  this.ConfirmDialogRef=this.matDialog.open(ConfirmDialogComponent,{
    width:'600px'
  }); 

  this.ConfirmDialogRef.componentInstance.dialogMesaj=kayit.urunAd + "  --> Bu Öğrenci Silinecektir Onaylıyor Musunuz ?"

  this.ConfirmDialogRef.afterClosed().subscribe(d=>{
    if (d){
      this.apiServis.UrunSil(kayit.urunId).subscribe((s:Sonuc)=>{
        this.alert.AlertUygula(s);
        if (s.islem){
          this.OgrenciListele();
        }
      })
    }
  });
  }
}
