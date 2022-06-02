import { Urun } from 'src/app/models/Urun';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UrunDialogComponent } from '../urun-dialog/urun-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { apiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-urunler-dialog',
  templateUrl: './urunler-dialog.component.html',
  styleUrls: ['./urunler-dialog.component.scss']
})
export class UrunlerDialogComponent implements OnInit {
  kategoriId:string;
 urunler:Urun[];
  dialogBaslik: string;
  islem: string;
  frm:FormGroup;
  yeniKayit:Urun;

  constructor(
    public apiServis:apiService,
    public matDialog:MatDialog,
    public frmBuild:FormBuilder,
    public dialogRef:MatDialogRef<UrunDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any

    ) { 
    this.islem=data.islem;
    this.yeniKayit=data.kayit;
    if (this.islem=='ekle'){
      this.dialogBaslik="Kategori Ekle";
    }
    if (this.islem=='duzenle'){
      this.dialogBaslik="Kategori Düzenle";
    }
    this.frm=this.FormOlustur();
  }

  ngOnInit() {
    this.UrunListe();
  }
  FormOlustur(){
    return this.frmBuild.group({
      urunAd:[this.yeniKayit.urunAd],
      urunStok:[this.yeniKayit.urunStok],
      urunFiyat:[this.yeniKayit.urunFiyat],
      urunKategoriId:[this.yeniKayit.urunKatId],

    });
  }
  UrunListe(){
    this.apiServis.UrunListe().subscribe((d:Urun[])=>{
      this.urunler = d;
    });
  }

}
