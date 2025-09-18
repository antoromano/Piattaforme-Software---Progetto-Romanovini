import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiCategoriaComponent } from './aggiungi-categoria.component';

describe('AggiungiCategoriaComponent', () => {
  let component: AggiungiCategoriaComponent;
  let fixture: ComponentFixture<AggiungiCategoriaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AggiungiCategoriaComponent]
    });
    fixture = TestBed.createComponent(AggiungiCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
