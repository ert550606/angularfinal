import { AlertDialogComponent } from './../components/dialogs/alert-dialog/alert-dialog.component';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { Sonuc } from '../models/Sonuc';

@Injectable({
  providedIn: 'root'
})
export class MyAlertService {
  alertDiaogRef:MatDialogRef<AlertDialogComponent>;
  constructor(
    public matDialog:MatDialog
  ) {}

  AlertUygula(s:Sonuc){
    var baslik="";
    if (s.islem){
      baslik="İşlem Gerçekleştirilmiştir!";
    }else{
      baslik="Hata Oldu";
    }

    this.alertDiaogRef=this.matDialog.open(AlertDialogComponent,{
    width:'300px'
    });
    this.alertDiaogRef.componentInstance.dialogBaslik=baslik;
    this.alertDiaogRef.componentInstance.dialogMesaj=s.mesaj;
    this.alertDiaogRef.componentInstance.dialogIslem=s.islem;

    this.alertDiaogRef.afterClosed().subscribe(d=>{
      this.alertDiaogRef = null;
  });

 }

}