import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnuncioPymeComponent } from './anuncio-pyme.component';

describe('AnuncioPymeComponent', () => {
  let component: AnuncioPymeComponent;
  let fixture: ComponentFixture<AnuncioPymeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnuncioPymeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnuncioPymeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
