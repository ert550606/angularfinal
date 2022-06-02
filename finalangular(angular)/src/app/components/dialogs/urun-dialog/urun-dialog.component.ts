import { apiService } from './../../../services/api.service';
import { Urun } from 'src/app/models/Urun';
import { Kategori } from 'src/app/models/Kategori';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-urun-dialog',
  templateUrl: './urun-dialog.component.html',
  styleUrls: ['./urun-dialog.component.scss']
})
export class UrunDialogComponent implements OnInit {
  kategoriId:string;
  kategoriler:Kategori[];
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
    this.KategoriListe();
  }
  FormOlustur(){
    return this.frmBuild.group({
      urunAd:[this.yeniKayit.urunAd],
      urunStok:[this.yeniKayit.urunStok],
      urunFiyat:[this.yeniKayit.urunFiyat],
      urunKatId:[this.yeniKayit.urunKatId],

    });
  }
  KategoriListe(){
    this.apiServis.KategoriListe().subscribe((d:Kategori[])=>{
      this.kategoriler = d;
    });
  }
  KategoriSec(kategori:Kategori){
    this.kategoriId = kategori.kategoriId;
  }
}
