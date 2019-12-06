import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DretivaCustomizadasComponent } from './dretiva-customizadas.component';

describe('DretivaCustomizadasComponent', () => {
  let component: DretivaCustomizadasComponent;
  let fixture: ComponentFixture<DretivaCustomizadasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DretivaCustomizadasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DretivaCustomizadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
