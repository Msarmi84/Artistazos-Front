import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompradorFormComponent } from './comprador-form.component';

describe('CompradorFormComponent', () => {
  let component: CompradorFormComponent;
  let fixture: ComponentFixture<CompradorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompradorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompradorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
