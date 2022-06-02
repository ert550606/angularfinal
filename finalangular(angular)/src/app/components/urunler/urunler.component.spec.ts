/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UrunlerComponent } from './urunler.component';

describe('UrunlerComponent', () => {
  let component: UrunlerComponent;
  let fixture: ComponentFixture<UrunlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UrunlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UrunlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
